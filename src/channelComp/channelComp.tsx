import React, { Component } from "react";
import "./channelComp.scss";
import channelData from "../channelData/channelData.json";

class ChannelComp extends Component {
  constructor(props: any) {
    super(props);
  }

  state: any = {
    loadedPost: [],
    orginalData: [],
    dublicateData: []
  };

  componentDidMount() {
    this.setState({ orginalData: channelData });
    this.sortData();
  }

   printUniqueResults = (arrayOfObj:any, key:any) =>{
    return arrayOfObj.filter((item:any, index:any, array:any) => {
      return array.map((mapItem:any) => mapItem[key]).indexOf(item[key]) !== index
    })
  }

  updateDayNight = (data: any) => {
    for (let j = 0; j < data.length; j++) {
      let monthFormat: any = data[j].time.split(" ");
      let updateMonthFormat: any = new Date(monthFormat[0]).toString();
      data[j].originalMonFormat = updateMonthFormat;
      data[j].dublicate = false;
      
      let finalMonthFormat: any = updateMonthFormat.split(" ");
      let dateMonthFormat: any =
        finalMonthFormat[0] +
        ", " +
        finalMonthFormat[1] +
        finalMonthFormat[2] +
        ", " +
        finalMonthFormat[3];

      data[j].monFormat = dateMonthFormat;
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
    const result = this.printUniqueResults(data, 'originalMonFormat');
    console.log("result"+result);
    this.setState({dublicateDAta: result})
    
    this.setState({ loadedPost: data });
    console.log("final state data"+this.state.loadedpost);
  };

  sortData() {
    let newData: any = channelData;
    let sortedData: any = newData.slice().sort((a: any, b: any) => {
      return +new Date(a.time) - +new Date(b.time);
    });
    this.updateDayNight(sortedData);
    //this.setState({ loadedPost: sortedData });
  }

  render() {
    return (
      <div className="channel">
        {this.state.loadedPost.map((data: any) => {
          return (
            <div className="card-wrapper">
              <p>{data.monFormat}</p>
          <p>{data.dublicate}</p>
              <div className="card" key={Date.now()}>
                <div className="subjectPhoto">
                  <img
                    src={data.subjectPhotoUrl}
                    width="50px"
                    height="50px"
                    alt="subject Photo"
                  />
                </div>

                <div className="contentDetails">
                  <div className="title">{data.title}</div>
                  <div className="description">{data.description}</div>
                </div>

                <div className="authorDetails">
                  <span className="instructorPhoto">
                    <img
                      src={data.instructorPhotoUrl}
                      width="50px"
                      height="50px"
                      alt="instructor photo"
                    />
                  </span>
                  <span className="name">{data.instructorName}</span>
                </div>
                <div className="time">{data.hourFormat}</div>
              </div>
            </div>
          );
        })}
        
      </div>
    );
  }
}

export default ChannelComp;
