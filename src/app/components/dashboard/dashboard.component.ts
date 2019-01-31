import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  vidyoConnector: any;
  constructor() {}

  ngOnInit() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://static.vidyo.io/4.1.12.8/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=1&plugin=0";
    //"https://static.vidyo.io/latest/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=1&plugin=0";
    document.getElementsByTagName("head")[0].appendChild(script);

    this.listenEvent();
  }

  listenEvent() {
    document.addEventListener("vidyoclient:ready", (e?: any) => {
      console.log(e.detail);
      this.vidyoConnector = e.detail;
      this.setupVidyoClient(e.detail);
      console.log(e.detail);
    });
  }

  setupVidyoClient(VC) {
    console.log("vc object", this.vidyoConnector);
    VC.CreateVidyoConnector({
      viewId: "renderer", // Div ID where the composited video will be rendered, see VidyoConnector.html
      viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
      remoteParticipants: 15, // Maximum number of participants
      logFileFilter: "warning all@VidyoConnector info@VidyoClient",
      logFileName: "",
      userData: ""
    })
      .then(function(vidyoConnector) {
        vidyoConnector
          .Connect({
            host: "prod.vidyo.io",
            token:
              "cHJvdmlzaW9uAHVzZXIxQGNmYjEwNC52aWR5by5pbwA2MzcxNjE5NzQ0MwAAOTQyY2I1MWMyNDM5ZGYyOTAwZGYyMDJjZjBmM2I3ZDIzNTI5OTQ0YTVjOWQ4OTc2MzM3NzI4ZjAwZWNmZmNjMWIyYWU5ZGUyZmEzYWUxNGM5M2YzZWQ0ZGVmY2M5YmJi",
            displayName: "John Smith",
            resourceId: "JohnSmithRoom",
            // Define handlers for connection events.
            onSuccess: function() {
              /* Connected */
            },
            onFailure: function(reason) {
              /* Failed */
            },
            onDisconnected: function(reason) {
              /* Disconnected */
            }
          })
          .then(function(status) {
            if (status) {
              console.log("ConnectCall Success");
              alert(status);
            } else {
              console.error("ConnectCall Failed");
            }
          })
          .catch(function() {
            console.error("ConnectCall Failed");
          });
      })
      .catch(function() {
        console.error("CreateVidyoConnector Failed");
      });
  }

  disconnectVidyo() {
    alert("fire disconnect event");
    alert(this.vidyoConnector);
    this.vidyoConnector.Disconnect();
  }
}
