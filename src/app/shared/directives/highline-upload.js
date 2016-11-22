'use strict';

angular.module('highline-ui').directive('highlineUpload', [function () {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/directives/templates/highline-upload.tpl.html',
        controller: ['$rootScope', '$scope', '$attrs', '$timeout', 'HIGHLINE', 'HighlineAuthentication', function ($rootScope, $scope, $attrs, $timeout, HIGHLINE, HighlineAuthentication) {

            $scope.debug = false;

            $scope.files = [];
            $scope.showUploadControls = false;
            $scope.maxFilesAllowed = $attrs.maxFilesAllowed || 1;
            $scope.listener = $attrs.listener || 'NONE';
            $scope.uploadIcon = $attrs.uploadIcon || 'upload';

            $scope.hasUploadError = false;
            $scope.uploadErrorCode = 0;
            $scope.uploadErrorMessage = "";

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

            $scope.uploadable = function () {
                return ($scope.files.length <= 0);
            };

            $scope.resettable = function () {
                return ($scope.uploadable()) || $scope.hasUploadError;
            };

            $scope.upload = function () {
                $scope.uploader.start();
            };

            $scope.removeFile = function(file) {
                $scope.hasUploadError = false;
                $scope.uploader.removeFile(file);
            };

            $scope.reset = function() {
                $scope.hasUploadError = false;
                $scope.uploader.splice();
                $scope.files = [];
            };

            $scope.uploader = new plupload.Uploader({
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
                        $scope.hasUploadError = false;
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
                        up.settings.multipart_params = {
                            user_id: $scope.user_id,
                            path_id: 'USER',
                            original: file.name
                        };
                    },
                    UploadProgress: function (up, file) {
                        var index = $scope.files.indexOf(file);
                        $scope.files[index] = file;
                        $scope.$apply();
                    },
                    FileUploaded: function(up, file, result) {

                    },
                    UploadComplete: function(up, files) {

                        if (!$scope.hasUploadError) {
                            $rootScope.$broadcast(HIGHLINE.EVENTS[$scope.listener]);
                            $scope.reset();
                            $scope.uploadClose();
                            $scope.$apply();
                        }
                    },
                    Error: function (up, err) {
                        up.stop();
                        $scope.uploadErrorCode = err.code;
                        $scope.uploadErrorMessage = err.message;
                        $scope.hasUploadError = true;
                        $scope.$apply();
                    }
                }
            });

            $scope.uploader.init();

        }]
    };

}]);

