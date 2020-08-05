import React from "react";
import { Link } from "react-router";
import NavbarContainer from "../navbar/navbar_container";
import BookingFormContainer from "./booking_form_container";
import Rating from "react-rating";


class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    const mapOptions = {
      position: { lat: this.props.listing.lat, lng: this.props.listing.lng },
      zoom: 10.4,
      pov: {
        heading: 34
      }
    };

    this.map = new google.maps.StreetViewPanorama(this.mapNode, mapOptions);
  }
  componentDidUpdate() {

    const mapOptions = {
      position: { lat: this.props.listing.lat, lng: this.props.listing.lng },
      zoom: 10.4,
      pov: {
        heading: 34
      }
    };

    this.map = new google.maps.StreetViewPanorama(this.mapNode, mapOptions);
  }

  render() {
  return (
    <div className="listing-detail-page">
      <NavbarContainer />
      <div className="list-show-body">
        <div className="list-show-header">
          <div className="list-show-header-description-container">
            <div className="list-show-header-description">
              <div className="list-show-header-description-text">
                {this.props.listing.title}
              </div>
              <div className="list-show-header-description-otherInfo">
                {/* <Rating
                  className="show-rating"
                  placeholderRating={1}
                  emptySymbol={<img src="./star-solid.svg" className="star" />}
                  placeholderSymbol={<img src="./star-solid.svg" className="star" />}
                  fullSymbol={<img src="./star-solid.svg" className="star" />}
                /> */}
                <div className="show-rating">
                  <img src="./star-solid.svg" className="star" />
                  <img src="./star-solid.svg" className="star" />
                  <img src="./star-solid.svg" className="star" />
                  <img src="./star-solid.svg" className="star" />
                  <img src="./star-solid.svg" className="star" />
                </div>
                <span className="show-interpunct"> · </span>
                <img
                  className="plus-show"
                  src="./Screen Shot 2018-11-23 at 11.15.19 AM.png"
                />
                <span className="show-interpunct"> · </span>
                <div className="list-show-header-location">
                  New York, United States
                </div>
              </div>
            </div>
          </div>
          <div className="list-show-images-container">
            <div className="list-show-images">
              <div className="list-show-images-pad">
                <div className="list-show-images-frame">
                  <div className="list-show-image-main">
                    <img className="index-image-main-1" src={this.props.listing.picture_url} />
                  </div>
                  <div className="list-show-image-side">
                    <div className="list-show-image-1-2">
                      <img className="index-image-top" src={"3-1200x800.jpg"} />
                      <img
                        className="index-image-bottom"
                        src={"Black-looks-exquisite-in-the-bachelor-pad-bedroom.jpg"}
                      />
                    </div>
                    <div className="list-show-image-1-2">
                      <img
                        className="index-image-top"
                        src={"pharrell-williams-miami-penthouse-kitchen-1.jpg"}
                      />
                      <img
                        className="index-image-bottom"
                        src={
                          "luxury-pictures-of-modern-bathrooms-21-ideas-beautiful-bathroom-designs-from-schmidt.jpg"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="listing-body-container">
          <div className="listing-body-description">
            <div className="listing-body-intro">
              <div className="property-type">Entire house hosted by Jason</div>
              <div className="listing-amenities-preview">
                <div className="preview-house">
                  <div className="preview-body">
                    <div className="amenities-preview">
                      <div className="amenities-text">
                        <img
                          className="amenities-icon"
                          src="./Screen Shot 2018-11-23 at 12.21.41 PM.png"
                        />
                          4 guests
                      </div>
                      <span className="show-interpunct"> · </span>
                      <div className="amenities-text">
                        <img
                          className="amenities-icon"
                          src="./Screen Shot 2018-11-23 at 12.24.07 PM.png"
                        />
                        1 bedroom
                      </div>
                      <span className="show-interpunct"> · </span>
                      <div className="amenities-text">
                        <img
                          className="amenities-icon"
                          src="./Screen Shot 2018-11-23 at 12.23.28 PM.png"
                        />
                        2 beds
                      </div>
                      <span className="show-interpunct"> · </span>
                      <div className="amenities-text">
                        <img
                          className="amenities-icon"
                          src="Screen Shot 2018-11-23 at 12.23.48 PM.png"
                        />
                        1 bath
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="listing-intro-description-container">
              <div className="listing-intro-description">
                <div className="listing-intro-description-item">
                  <div className="LID-item-image">
                    <img className="LID-item-image-img" src="house.png"/>            
                  </div>
                  <div className="LID-item-text">
                    <div className="LID-item-text-header">
                      Entire Home
                    </div>      
                    <div className="LID-item-text-description">
                      You'll have the house to yourself
                    </div>      
                  </div>
                </div>
                <div className="listing-intro-description-item">
                  <div className="LID-item-image">
                    <img className="LID-item-image-img" src="door.png"/>            
                  </div>
                  <div className="LID-item-text">
                    <div className="LID-item-text-header">
                      Self check-in
                    </div>      
                    <div className="LID-item-text-description">
                      Check yourself in from the app
                    </div>      
                  </div>
                </div>
                <div className="listing-intro-description-item">
                  <div className="LID-item-image">
                    <img className="LID-item-image-img" src="clean.png"/>            
                  </div>
                  <div className="LID-item-text">
                    <div className="LID-item-text-header">
                      Enhanced cleaning
                    </div>      
                    <div className="LID-item-text-description">
                      Part of the enhanced cleaning program to ensure a deep clean between each stay
                    </div>      
                  </div>
                </div>
                <div className="listing-intro-description-item-bottom">
                  <div className="LID-item-image">
                    <img className="LID-item-image-img" src="fun.png"/>            
                  </div>
                  <div className="LID-item-text">
                    <div className="LID-item-text-header">
                      Fun guaranteed
                    </div>      
                    <div className="LID-item-text-description">
                      Plus verified locations are highly rated and commited to providing great stays for guests
                    </div>      
                  </div>
                </div>
              </div>          
            </div>
            <div className="listing-body-info-container">
              <div className="listing-body-info-description">
                *** <strong>Minimum two night stay</strong> ***
                <br />
                <br />
                <br />
                {this.props.listing.description}. 
                <br/>
                <br/>
                If you're looking for an affordable place to stay in the middle of it all then welcome to my home! This cozy queen size private bedroom has a true city feeling, only a few minutes walk to the nearest train station!. We offer coffee to all the guests :)
                <br/>
                <br/>
                <div className="bold">The space</div>
                  The apartment is in the center of it all, near the subway station, lots of restaurants and shops around. The building has a a lovely rooftop space in which you can go relax with view to the skyline.
                <br/>
                <br/>
                Two people per room, but if there's more than two then I can offer my couch or sleeping bags ($30 per extra person), the room is big enough to fit more; or they can sleep in the living room if needed.
                <br/>
                <br/>
                I also rent extra rooms on meeplebnb, same apartment.
                <br/>
                <br/>
                <div className="bold">Guest access</div>
                    You will have access to the entire shared apartment, be free to chill in the living room and make your meals in the kitchen, please buy your own ingredients and the kitchen is all yours! (You can store your food in the fridge if you need).
                <br/>
                <br/>
                      (ROOFTOP IS CLOSED DURING WINTER AND FALL SEASON)
                <br/>
                <br/>
                Fresh towels are provided.
                <br/>
                There's laundry in the building (not free).
                <br/>
                Shared bathroom, ALWAYS clean.
              </div>
            </div>
            <div className="lat-lng">
              {this.props.listing.lat}
              {this.props.listing.lng}
            </div>
            <div className="listing-body-info-location">Location</div>
            <div className="listing-body-info-addy">Address: 
              <div className="listing-body-info-addy-prop">
                {this.props.listing.address}
              </div>             
            </div>
            <div className="street-map" ref={map => (this.mapNode = map)}></div>
          </div>
          <BookingFormContainer listing={this.props.listing} />
        </div>
      </div>
    </div>
  );
};
}

export default ListingDetail;
