var vidyoConnector;

function onVidyoClientLoaded(status) {
  switch (status.state) {
    case "READY":
      VC.CreateVidyoConnector({
        viewId: "renderer",
        viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default",
        remoteParticipants: 10,
        logFileFilter: "warning all@VidyoConnector info@VidyoClient",
        logFileName: "",
        userData: ""
      }).then(vc => {
        console.log("VidyoClient Success", vc);
        vidyoConnector = vc;
        //Adding codes to register for devices
        vidyoConnector.RegisterLocalCameraEventListener({
          onAdded: function (localCamera) {},
          onRemoved: function (localCamera) {},
          onSelected: function (localCamera) {},
          onStateUpdated: function (localCamera, state) {}
        }).then(function () {
          console.log("RegisterLocalCameraEventListener Success");
        }).catch(function () {
          console.error("RegisterLocalCameraEventListener Failed");
        });

        vidyoConnector.RegisterLocalMicrophoneEventListener({
          onAdded: function (localMicrophone) {},
          onRemoved: function (localMicrophone) {},
          onSelected: function (localMicrophone) {},
          onStateUpdated: function (localMicrophone, state) {}
        }).then(function () {
          console.log("RegisterLocalMicrophoneEventListener Success");
        }).catch(function () {
          console.error("RegisterLocalMicrophoneEventListener Failed");
        });

        vidyoConnector.RegisterLocalSpeakerEventListener({
          onAdded: function (localSpeaker) {},
          onRemoved: function (localSpeaker) {},
          onSelected: function (localSpeaker) {},
          onStateUpdated: function (localSpeaker, state) {}
        }).then(function () {
          console.log("RegisterLocalSpeakerEventListener Success");
        }).catch(function () {
          console.error("RegisterLocalSpeakerEventListener Failed");
        });
      }).catch(error => {
        console.log("VidyoClient failed", error);
        onVidyoClientLoaded(status);
      });
      break;
    case "RETRYING": // The library operating is temporarily paused
      console.log("RETRYING");
      break;
    case "FAILED": // The library operating has stopped
      console.log("FAILED");
      break;
    case "FAILEDVERSION":
      console.log("FAILEDVERSION");
      break;
    case "NOTAVAILABLE": // The library is not available
      console.log("NOTAVAILABLE");
      break;
  }
  status.downloadType; // Available download types with possible values of "MOBILE" "PLUGIN" "APP"
  status.downloadPathApp; // Path to the application installer for the app which could be invoked with a protocol handler
  status.downloadPathPlugIn; // Path to the Plugin that can be installed
  status.downloadPathWebRTCExtensionChrome; // Path to the optional Chrome extension required for Screen Sharing in WebRTC
  status.downloadPathWebRTCExtensionFirefox; // Path to the optional Firefox extension required for Screen Sharing in WebRTC
  return true; // Return true to reload the plugins if not available
}
