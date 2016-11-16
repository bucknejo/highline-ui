'use strict';

angular.module('highline-ui').directive('highlineUpload', [function () {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/upload.tpl.html',
        controller: ['$scope', '$attrs', '$timeout', 'HIGHLINE', 'HighlineAuthentication', function ($scope, $attrs, $timeout, HIGHLINE, HighlineAuthentication) {

            $scope.debug = false;

            $scope.showUploadControls = false;
            $scope.maxFilesAllowed = $attrs.maxFilesAllowed;

            $scope.$watch(function () {
                return HighlineAuthentication.isAuthenticated();
            }, function () {
                $scope.authenticated = HighlineAuthentication.isAuthenticated();
                $scope.user_id = HighlineAuthentication.getUserId();
            });

            $scope.uploadOpen = function () {
                $scope.showUploadControls = true;
            };

            $scope.uploadClose = function () {
                $scope.showUploadControls = false;
            };

            $scope.files = [];

            $scope.uploadable = function () {
                return ($scope.files.length > 0) ? false : true;
            };

            $scope.upload = function () {
                $scope.uploader.start();
            };

            $scope.removeFile = function(file) {
                $scope.uploader.removeFile(file);
            };

            $scope.reset = function() {
                $scope.uploader.splice();
                $scope.files = [];
            };

            $scope.uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                url: HIGHLINE.SERVER.RESOURCE + "service/upload/plupload",
                browse_button: 'browse',
                chunk_size: '200kb',
                max_retries: 3,
                filters: {
                    max_file_size: '10mb',
                    mime_types: [
                        {title: "Image files", extensions: "jpg,gif,png"},
                        {title: "Zip files", extensions: "zip"}
                    ]
                },
                unique_names: true,
                init: {
                    PostInit: function (up) {
                    },
                    Browse: function(up) {
                    },
                    FilesAdded: function (up, files) {

                        up.splice($scope.maxFilesAllowed);

                        $scope.files = up.files;
                        $scope.$apply();

                    },
                    QueueChanged: function(up) {

                    },
                    FilesRemoved: function(up, files) {

                    },
                    BeforeUpload: function(up, file) {
                        console.log('files in queue: ' + up.files.length);
                        up.settings.multipart_params = {user_id: $scope.user_id, path_id: 'USER', original: file.name};
                    },
                    UploadProgress: function (up, file) {
                        var index = $scope.files.indexOf(file);
                        $scope.files[index] = file;
                        $scope.$apply();
                    },
                    FileUploaded: function(up, file, result) {

                    },
                    UploadComplete: function(up, files) {
                        console.log('upload complete!');
                        $scope.reset();
                        $scope.uploadClose();
                        $scope.$apply();
                    },
                    Error: function (up, err) {
                        //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
                    }
                }
            });

            $scope.uploader.init();

        }]
    };

}]);

