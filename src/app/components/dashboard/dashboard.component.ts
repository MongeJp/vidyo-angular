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

    // "https://static.vidyo.io/latest/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=1&plugin=0";
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
    console.log("aqui brother", this.vidyoConnector);
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
              "cHJvdmlzaW9uAHVzZXIxQGNmYjEwNC52aWR5by5pbwA2MzcxNjE5MjYxNQAAZWQ2MzlhZDkyMzFlOTVhNjM2YTk5NzliZmUzMGM4MzM2YWRhODU4MGI3NTM4NzYzZTU3OWVlZDBjZDFhZjgzY2U3ZGJmM2Y3NDU3MjQ0OTEwM2E2NmQzMzIyOTg5YWJi",
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
    alert("amonos alv");
    this.vidyoConnector.Disconnect();
  }
}
