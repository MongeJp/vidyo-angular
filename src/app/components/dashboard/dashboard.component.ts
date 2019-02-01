import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ScriptService } from "../../script.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  /* Preview button display toggle control */
  public preview: boolean = true;

  /* Call Connect button display toggle control */
  public connected: boolean = false;
  constructor(private scriptService: ScriptService) {}

  ngOnInit() {
    // const script = document.createElement("script");
    // script.type = "text/javascript";
    // script.src =
    //   "https://static.vidyo.io/4.1.12.8/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=1&plugin=0";
    // //"https://static.vidyo.io/latest/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=1&plugin=0";
    // document.getElementsByTagName("head")[0].appendChild(script);
    //
    // this.listenEvent();
  }

  /**
   * Open dialog after 2 seconds, have to added delay due to an issue with material dialog.
   */
  ngAfterViewInit() {
    this.scriptService
      .load("videoClient")
      .then(data => {
        console.log("script loaded ", data);
        this.setupVidyoClient(data);
      })
      .catch(error => console.log(error));
  }

  listenEvent() {
    document.addEventListener("vidyoclient:ready", (e?: any) => {
      console.log(e.detail);
      this.vidyoConnector = e.detail;
      this.setupVidyoClient(e.detail);
      console.log(e.detail);
    });
  }

  setupVidyoClient(vidyoConnector) {
    console.log("vc object", vidyoConnector);
    vidyoConnector
      .Connect({
        host: "prod.vidyo.io",
        token:
          "cHJvdmlzaW9uAHVzZXIxQGNmYjEwNC52aWR5by5pbwA2MzcxNjI2OTIzMwAANGU5MGU1NWRmYTE4MWI5ZDZhNjg0ZDZkN2E4NTFhNGFhYmQyOTA1NDdhNmI0ODc4MTkzMmU5NWQ2NjhmZmMxYjFlMmUxOGFkOTYyYzJlNzM2OTZkNzcwN2FiNGZkMzUy",
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
  }

  loadScript(url) {
    console.log("preparing to load...");
    let node = document.createElement("script");
    node.src = url;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  /**
   * Toggles the video call button/functionality
   */
  toggleConnect() {
    if (this.connected) {
      console.debug("Disconnecting video call");
      vidyoConnector.Disconnect(); // need to check success, before removing participants.
      console.log("disconnect call");
      this.connected = false;
      vidyoConnector
        .GetVersion()
        .then(function(version) {
          let clientVersion = document.getElementById("clientVersion");
          clientVersion.innerHTML = "v" + version;
        })
        .catch(function() {
          console.error("GetVersion failed");
        });
    } else {
      console.log("connect call");
      this.connected = true;
      this.setupVidyoClient(vidyoConnector);
      vidyoConnector
        .GetVersion()
        .then(function(version) {
          let clientVersion = document.getElementById("clientVersion");
          clientVersion.innerHTML = "v" + version;
        })
        .catch(function() {
          console.error("GetVersion failed");
        });
    }
  }

  /**
   * Toggles the preview button/functionality
   */
  togglePreview() {
    this.preview = !this.preview;
    console.log(`Toggle Preview to: ${this.preview}`);
    vidyoConnector.ShowPreview(this.preview);
  }

  /* disconnectVidyo() {
    alert("fire disconnect event");
    alert(this.vidyoConnector);
    this.vidyoConnector.Disconnect();
  } */
}
