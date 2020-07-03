import React, { Component } from "react";
import "./channelComp.scss";
import channelData from "../channelData/channelData.json";
import ViewComp from "../viewComp/viewComp";

class ChannelComp extends Component {
  constructor(props: any) {
    super(props);
  }

  state: any = {
    loadedPost: [],
    viewComponent: [],
  };

  componentDidMount() {
    this.sortData();
  }

  //To convert Dates(Numbers) to string
  numericToDateFormater = (arr: any, count: any) => {
    let monthFormat: any = arr[count].time.split(" ");
    let updateMonthFormat: any = new Date(monthFormat[0]).toString();
    arr[count].originalMonFormat = updateMonthFormat;
    arr[count].dublicate = false;

    let finalMonthFormat: any = updateMonthFormat.split(" ");
    let dateMonthFormat: any =
      finalMonthFormat[0] +
      ", " +
      finalMonthFormat[1] +
      finalMonthFormat[2] +
      ", " +
      finalMonthFormat[3];

    arr[count].monFormat = dateMonthFormat;
    arr[count].index = count;
  };

  //To convert 24Hrs format to 12 Hrs format
  updateAmPmTime = (data: any) => {
    for (let j = 0; j < data.length; j++) {
      this.numericToDateFormater(data, j);
      let splitHour = data[j].time.split(" ");

      let timeString = splitHour[1];
      let H = +timeString.substr(0, 2);

      let h = H % 12 || 12;

      let ampm = H < 12 ? "AM" : "PM";
      let tempVal: any = h + ":00" + ampm;
      if (h == 12) {
        data[j].hourFormat = tempVal + " - " + (1 + ":00" + ampm);
      } else {
        data[j].hourFormat = tempVal + " - " + (h + 1 + ":00" + ampm);
      }
    }
    this.setState({ loadedPost: data });
    console.log("final state data" + this.state.loadedpost);
  };

  //To sort data based on dates in ascending order
  sortData() {
    let newData: any = channelData;
    let sortedData: any = newData.slice().sort((a: any, b: any) => {
      return +new Date(a.time) - +new Date(b.time);
    });
    this.updateAmPmTime(sortedData);
  }

  //To find dublicates in dates
  findDublicate(value: any) {
    if (this.state.viewComponent.indexOf(value) < 0) {
      this.state.viewComponent.push(value);
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="channel">
        {this.state.loadedPost.map((data: any) => {
          return this.findDublicate(data.time.substr(0, 10)) ? (
            <ViewComp
              monthFormat={data.monFormat}
              key={data.index}
              courseImgSrc={data.subjectPhotoUrl}
              contentTitle={data.title}
              contentDescription={data.description}
              authorImgSrc={data.instructorPhotoUrl}
              authorName={data.instructorName}
              courseDuration={data.hourFormat}
            />
          ) : (
            <ViewComp
              key={data.index}
              courseImgSrc={data.subjectPhotoUrl}
              contentTitle={data.title}
              contentDescription={data.description}
              authorImgSrc={data.instructorPhotoUrl}
              authorName={data.instructorName}
              courseDuration={data.hourFormat}
            />
          );
        })}
      </div>
    );
  }
}

export default ChannelComp;
