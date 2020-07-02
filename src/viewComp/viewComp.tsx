import React from "react";
import "./viewComp.scss";

const ViewComp = (props: any) => {
  return (
    <div className="channel">
      <section className="card-wrapper">
        <h3>{props.monthFormat}</h3>
        
        <section className="card" key={props.key}>
          <section className="subjectPhoto">
            <a aria-labelledby="image" href="#">
              <img
                src={props.courseImgSrc}
                width="50px"
                height="50px"
                alt="subject Photo"
              />
            </a>
            <span className="cdk-visually-hidden" id="image">
              By clicking image, User can able to see full details of course
            </span>
          </section>

          <section className="contentDetails">
            <section className="title">
              <a href="#" aria-labelledby="title">
                {props.contentTitle}
              </a>
              <span className="cdk-visually-hidden" id="title">
                By clicking this link, User can able to see full details of
                course
              </span>
            </section>
            <section className="description">{props.contentDescription}</section>
          </section>

          <section className="authorDetails">
            <a href="#" aria-labelledby="authorDetails">
              <section className="instructorPhoto">
                <img
                  src={props.authorImgSrc}
                  width="50px"
                  height="50px"
                  alt="instructor photo"
                />
              </section>
              <section className="name">{props.authorName}</section>
            </a>
            <span className="cdk-visually-hidden" id="authorDetails">
              By clicking image, User can able to see author Details
            </span>
          </section>
          <section className="time">{`${props.courseDuration} IST`}</section>
        </section>
      </section>
    </div>
  );
};

export default ViewComp;
