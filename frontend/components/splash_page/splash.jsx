import React from 'react';
import {Link} from 'react-router-dom';
import SearchContainer from '../searchbar/searchbar_container.jsx';
import "react-dates/initialize";
import { DayPickerRangeController } from 'react-dates';
import momentPropTypes from "react-moment-proptypes";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splashInner: false,
      startDate: null,
      endDate: null,
      focusedInput: props.autoFocusEndDate ? 'endDate' : 'startDate',
      
    };

    this.checkinDate = this.checkinDate.bind(this);
    this.checkoutDate = this.checkoutDate.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isInclusivelyAfterDay = this.isInclusivelyAfterDay.bind(this);
    this.isBeforeDay = this.isBeforeDay.bind(this);
    this.changeBackgroundHover = this.changeBackgroundHover.bind(this);
    this.changeBackgroundUnhover = this.changeBackgroundUnhover.bind(this);
    this.focusMap = this.focusMap.bind(this);
  }

  changeBackgroundHover(e) {
    e.stopPropagation()
    this.setState({ splashInner: true })
  }

  changeBackgroundUnhover(e) {
    e.stopPropagation()
    this.setState({ splashInner: false })
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    });
  }

  isInclusivelyAfterDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    return !this.isBeforeDay(a, b);
  }

  isBeforeDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

    const aYear = a.year();
    const aMonth = a.month();

    const bYear = b.year();
    const bMonth = b.month();

    const isSameYear = aYear === bYear;
    const isSameMonth = aMonth === bMonth;

    if (isSameYear && isSameMonth) return a.date() < b.date();
    if (isSameYear) return aMonth < bMonth;
    return aYear < bYear;
  }

  focusMap() {
    document.querySelector('[class="search-container"]').click();
  }

  checkinDate() {
    
    if(this.state.startDate) {
      debugger
      const date = this.state.startDate._d.toDateString().split(" ");
      const month = date[1]
      const day = date[2]
      const year = date[3]
      return `${month}-${day}-${year}`
    } else {
      return "Add dates"
    }
  }

  checkoutDate() {
    
    if(this.state.endDate) {
      debugger
      const date = this.state.endDate._d.toDateString().split(" ");
      const month = date[1]
      const day = date[2]
      const year = date[3]
      return `${month}-${day}-${year}`
    } else {
      return "Add dates"
    }
  }


  render() {

    const isHovered = () => {
      if(this.state.splashInner) {
        return "splash-search-form-location-container-inner-hovered"
      } else {
        return "splash-search-form-location-container-inner"
      }
    }
 
    const nav = (
      <div className="splash-topbar">
        <section className="topsec">
            <div className="leftbar">
              <Link to="/greeting" className="navbar-left">
                <img src="./3d-meeple5.png" />
              </Link>
              <div className="leftbar-text">
                meeplebnb
              </div>
            </div>
  
            <div className="splash-search-container">
              <div className="splash-search-container-absolute">
                <div className="splash-search-padding">
                  <div className="splash-search-frame">
                    <fieldset className="splash-search-top">
                      <div className="splash-search-top-tabs">
                        <div className="splash-search-top-tab">
                          <span className="search-tab-stay">
                            Places to stay
                          </span>
                        </div>
                      </div>
                    </fieldset>
                    <div className="splash-search-form-container">
                      <div className="splash-search-form-frame">
                        <div className="splash-search-form-location-container" 
                             id="location-search"
                             onClick={this.focusMap}>
                          <div className={isHovered()} 
                               onMouseOver={this.changeBackgroundHover}
                               onMouseLeave={this.changeBackgroundUnhover}
                               onClick={this.focusMap}>
                            <div className="splash-search-form-location-container-inner-z"
                                 onClick={this.focusMap}>
                              <div className="splash-search-form-location-input-header"
                                   onClick={this.focusMap}>
                                Location
                              </div>
                                <SearchContainer className="search-container">
                                </SearchContainer>
                              {/* <input 
                                className="splash-search-form-location-input-input"
                                autoComplete="off"
                                autoCorrect="off"
                                placeholder="Where are you going?"
                                role="combobox">
                              </input> */}
                            </div>
                          </div>
                        </div>
                        <div className="splash-search-form-border-1" id="border1"></div>
                        <div className="splash-search-form-dates-item-container-1">
                          <div className="splash-search-form-dates-item-container-inner">
                            <div className="splash-search-form-dates-item-frame">
                              <div className="splash-search-form-dates-item-header">Check in</div>
                            <div className="splash-search-form-dates-item-body">{this.checkinDate()}</div>
                            </div>
                          </div>
                        </div>
                        <div className="splash-search-form-border-2"></div>
                        <div className="splash-daypicker">
                          <DayPickerRangeController
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={this.onFocusChange}
                            minimumNights={2}
                            noBorder={true}
                            numberOfMonths={2}
                            renderCalendarDay={undefined}
                            enableOutsideDays={false}
                            isOutsideRange={day => !this.isInclusivelyAfterDay(day, moment())}
                          />
                        </div>
                        <div className="splash-search-form-dates-item-container-2" id="search-dates">
                          <div className="splash-search-form-dates-item-container-inner">
                            <div className="splash-search-form-dates-item-frame">
                              <div className="splash-search-form-dates-item-header">Check out</div>
                            <div className="splash-search-form-dates-item-body">{this.checkoutDate()}</div>
                            </div>
                          </div>
                        </div>
                        <div className="splash-search-form-border-3"></div>
                        <div className="splash-search-guest-container">
                          <div className="splash-search-guest-container-inner">
                            <div className="splash-search-guest-frame">
                                <div className="splash-search-guest-header">Guests</div>
                                <div className="splash-search-guest-body">Add guests</div>
                            </div>
                          </div>
                          <div className="splash-search-submit-container">
                            <button className="splash-search-submit-frame">
                              <div className="splash-search-submit-icon-container">
                                <div className="splash-search-submit-icon">
                                  <img src="search.png"></img>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ul className="twobar">
              <nav className="splashbuttons">
                <li>
                  <button
                    className="loginbuttons"
                    onClick={() => this.props.openModal('login')}>Login
                  </button>
                </li>
                <li>
                  <button
                    className="loginbuttons"
                    onClick={() => this.props.openModal('signup')}>Signup
                  </button>
                </li>
                <li>
                    <button
                      className="loginbuttons"
                      value="Login as Demo User"
                      onClick={() => this.props.demoLogin()}> Log In as Demo User
                    </button>
                </li>
              </nav>
            </ul>
        </section>
      </div>
    );
  
    const splash = () => {
      if (this.props.loggedIn) {
        return (
          <nav/>
        );
      } else {
        return(
          <>
            <img className="splash" src="background1.jpg"/>
            {nav}
          </>
          );
      }
    };
  
  
    return splash();
  };
}





// export default ({ users, logout, loggedIn, demoLogin, openModal}) => {

//   const nav = (
//     <div className="splash-topbar">
//       <section className="topsec">

//           <div className="leftbar">
//             <Link to="/greeting" className="navbar-left">
//               <img src="./3d-meeple5.png" />
//             </Link>
//             <div className="leftbar-text">
//               meeplebnb
//             </div>
//           {/* <SearchContainer /> */}
//           </div>

//           <div className="splash-search-container">
//             <div className="splash-search-container-absolute">
//               <div className="splash-search-padding">
//                 <div className="splash-search-frame">
//                   <fieldset className="splash-search-top">
//                     <div className="splash-search-top-tabs">
//                       <div className="splash-search-top-tab">
//                         <span className="search-tab-stay">
//                           Places to stay
//                         </span>
//                       </div>
//                     </div>
//                   </fieldset>
//                   <div className="splash-search-form-container">
//                     <div className="splash-search-form-frame">
//                       <div className="splash-search-form-location-container" id="location-search">
//                       <div className="splash-search-form-location-container-inner" onClick={() => this.searchInput.focus()}>
//                           <div className="splash-search-form-location-container-inner-z">
//                             <div className="splash-search-form-location-input-header">
//                               Location
//                             </div>
//                             <div>
//                               <SearchContainer />
//                             </div>
//                             {/* <input 
//                               className="splash-search-form-location-input-input"
//                               autoComplete="off"
//                               autoCorrect="off"
//                               placeholder="Where are you going?"
//                               role="combobox">
//                             </input> */}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="splash-search-form-border-1" id="border1"></div>
//                       <div className="splash-search-form-dates-item-container-1">
//                         <div className="splash-search-form-dates-item-container-inner">
//                           <div className="splash-search-form-dates-item-frame">
//                             <div className="splash-search-form-dates-item-header">Check in</div>
//                             <div className="splash-search-form-dates-item-body">Add dates</div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="splash-search-form-border-2"></div>
//                       <div className="splash-search-form-dates-item-container-2" id="search-dates">
//                         <div className="splash-search-form-dates-item-container-inner">
//                           <div className="splash-search-form-dates-item-frame">
//                             <div className="splash-search-form-dates-item-header">Check out</div>
//                             <div className="splash-search-form-dates-item-body">Add dates</div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="splash-search-form-border-3"></div>
//                       <div className="splash-search-guest-container">
//                         <div className="splash-search-guest-container-inner">
//                           <div className="splash-search-guest-frame">
//                               <div className="splash-search-guest-header">Guests</div>
//                               <div className="splash-search-guest-body">Add guests</div>
//                           </div>
//                         </div>
//                         <div className="splash-search-submit-container">
//                           <button className="splash-search-submit-frame">
//                             <div className="splash-search-submit-icon-container">
//                               <div className="splash-search-submit-icon">
//                                 <img src="search.png"></img>
//                               </div>
//                             </div>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <ul className="twobar">
//             <nav className="splashbuttons">
//               <li>
//                 <button
//                   className="loginbuttons"
//                   onClick={() => openModal('login')}>Login
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="loginbuttons"
//                   onClick={() => openModal('signup')}>Signup
//                 </button>
//               </li>
//               <li>
//                   <button
//                     className="loginbuttons"
//                     value="Login as Demo User"
//                     onClick={demoLogin}> Log In as Demo User
//                   </button>
//               </li>
//             </nav>
//           </ul>
//       </section>
//     </div>
//   );

//   const splash = () => {
//     if (loggedIn) {
//       return (
//         <nav/>
//       );
//     } else {
//       return(
//         <>
//           <img className="splash" src="background1.jpg">
//           </img>
//           {nav}
//         </>
//         );
//     }
//   };


//   return splash();
// };
