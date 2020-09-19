import React from "react";
import ListingIndexItem from "./listing_index_item";
import ListingMap from "../listings/listing_map";
import Navbar from "../navbar/navbar_container";
import {convertMoment} from "../helper_methods/helper_methods.jsx";

export default class ListingIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.stayOptions.searchTerm,
      startDate: this.props.stayOptions.startDate,
      endDate: this.props.stayOptions.endDate,
      guests: this.props.stayOptions.guests,
      filteredList: this.props.filteredList,
      hovered: [null, null],
      priceFilterOpen: false,
      inputLeft: "0",
      leftMax: "999",
      inputRight: "1000",
      rightMin: "1",
      minFocus: false,
      maxFocus: false,
    };

    this.filteredListings = this.filteredListings.bind(this);
    this.allPropsOrFiltered = this.allPropsOrFiltered.bind(this);
    this.setHoveredListItem = this.setHoveredListItem.bind(this);
    this.unhovered = this.unhovered.bind(this);
    this.togglePriceFilter = this.togglePriceFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.runScript = this.runScript.bind(this);
    this.handleClickOutsidePriceFilter = this.handleClickOutsidePriceFilter.bind(this);
    this.toggleFocusMin = this.toggleFocusMin.bind(this);
    this.toggleFocusMax = this.toggleFocusMax.bind(this);
    this.onBlurPriceMin = this.onBlurPriceMin.bind(this);
    this.onBlurPriceMax = this.onBlurPriceMax.bind(this);
    this.keyInputPriceMin = this.keyInputPriceMin.bind(this)
    this.keyInputPriceMax = this.keyInputPriceMax.bind(this)
    this.defaultVal = this.defaultVal.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.keyDownClearInput = this.keyDownClearInput.bind(this);
    this.keyUpClearInput = this.keyUpClearInput.bind(this);
    this.saveInputs = this.saveInputs.bind(this);
    this.avgPrice = this.avgPrice.bind(this);
  }

  componentDidMount() {
    // debugger
    window.scroll(0,0)
    this.props.fetchReviews("all");
    this.props.fetchStayOptions();
    document.addEventListener('mouseup', this.handleClickOutsidePriceFilter);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutsidePriceFilter);
  }

  componentDidUpdate() {
    debugger
    if (this.state.priceFilterOpen) {
      this.runScript()
    } 
  }

  unhovered() {
    let newArray = this.state.hovered.slice(1).concat(null);
    this.setState({ hovered: newArray })
  }

  setHoveredListItem(listing) {
    let newArray = this.state.hovered.slice(1).concat(listing);
    this.setState({ hovered: newArray})
  }

  filteredListings(state, props) {
    let list = [];

    props.listings.forEach(function (listing) {
      const matched = listing.address.toLowerCase().includes(state.searchTerm.toLowerCase());
      const noZipArray = listing.address.split(" ");
      const noZip = noZipArray.slice(0, noZipArray.length - 1);
      const newAddress = noZip.join(" ");
      const newList = Object.assign({},listing);
      newList.address = newAddress

      if (matched) {
        list.push(newList);
      }
    });

    if(list.length) {
      return list;
    } else {
      return this.props.listings;
    }
  }
  
  allPropsOrFiltered(state, props) {
    if (this.props.searchTerm) {
      return this.filteredListings(state, props)
    } else {
      return this.props.listings
    }
  }

  togglePriceFilter() {
    this.forceUpdate()
    this.setState({priceFilterOpen: !this.state.priceFilterOpen})
  }

  handleChange(e) {
    if(e.target.id === "inputLeft") {
      document.getElementById("inputLeft").value = e.target.value
      this.setState({ 
        rightMin: `${+e.target.value + 1}`,
        [e.target.id]: e.target.value,
      })
    } else {
      document.getElementById("inputRight").value = e.target.value
      this.setState({
        leftMax: `${+e.target.value - 1}`,
        [e.target.id]: e.target.value,
      })
    }
    
  }

  runScript() {
    if (document.getElementById("input-left")) {
      let inputLeft = document.getElementById("input-left");
      let inputRight = document.getElementById("input-right");
      let priceLeft = document.getElementById("price-filter-min");
      let priceRight = document.getElementById("price-filter-max");
  
      let thumbLeft = document.querySelector(".slider > .thumb.left");
      let thumbRight = document.querySelector(".slider > .thumb.right");
      let range = document.querySelector(".slider > .range");
  
      function setLeftValue() {
      let _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

        
        if (priceLeft.value) {
          if (+priceLeft.value > +priceLeft.max - 1) {
            _this.value = "0"
            priceLeft.value = "0"
            inputRight.value = inputRight.max
            priceRight.value = priceRight.max
          } else if (+priceLeft.value > +priceRight.value) {
            _this.value = "0"
            priceLeft.value = "0"
          } else {
            if (parseInt(inputRight.value) > 50) {
              _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 50);
              priceLeft.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 50);
            } else {
              _this.value = "0"
              priceLeft.value = "0"
            }
          }
        } else {
          _this.value = "0";
        }
  
        let percent = ((_this.value - min) / (max - min)) * 100;
  
        thumbLeft.style.left = percent + "%";
        range.style.left = percent + "%";
      }
      setLeftValue();
  
      function setRightValue() {
        let _this = inputRight,
          min = parseInt(_this.min),
          max = parseInt(_this.max);

        if (priceRight.value) {
          if(+inputLeft.value > 0) {
            _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 50);
            priceRight.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 50);
          }
        } else {
          _this.value = "1000";
        }  
  
        let percent = ((_this.value - min) / (max - min)) * 100;
  
        thumbRight.style.right = (100 - percent) + "%";
        range.style.right = (100 - percent) + "%";
      }
      setRightValue();
  
      inputLeft.addEventListener("input", setLeftValue);
      inputRight.addEventListener("input", setRightValue);
  
      inputLeft.addEventListener("mouseover", function () {
        thumbLeft.classList.add("hover");
      });
      inputLeft.addEventListener("mouseout", function () {
        thumbLeft.classList.remove("hover");
      });
      inputLeft.addEventListener("mousedown", function () {
        thumbLeft.classList.add("active");
      });
      inputLeft.addEventListener("mouseup", function () {
        thumbLeft.classList.remove("active");
      });
  
      inputRight.addEventListener("mouseover", function () {
        thumbRight.classList.add("hover");
      });
      inputRight.addEventListener("mouseout", function () {
        thumbRight.classList.remove("hover");
      });
      inputRight.addEventListener("mousedown", function () {
        thumbRight.classList.add("active");
      });
      inputRight.addEventListener("mouseup", function () {
        thumbRight.classList.remove("active");
      });
      
    }
  }

  handleClickOutsidePriceFilter(e) {
    const clickPriceMenu = this.price && this.price.contains(e.target)
    const clickPriceButton = this.priceButton && this.priceButton.contains(e.target) === true
    const clickOutPrice = !(clickPriceMenu || clickPriceButton)
    const priceShouldClose = this.price && clickOutPrice
    if (priceShouldClose) {
      this.setState({ priceFilterOpen: false })
    }
  }

  toggleFocusMin() {
    this.setState({ minFocus: !this.state.minFocus})
  }

  toggleFocusMax() {
    this.setState({ maxFocus: !this.state.maxFocus})
  }

  onBlurPriceMin() {

    this.toggleFocusMin()

    const priceMin = document.getElementById("price-filter-min")
    const priceMinValue = document.getElementById("price-filter-min").value
    const priceMinMinimum = document.getElementById("price-filter-min").min
    const priceMinMaximum = document.getElementById("price-filter-min").max
    const leftInput = document.getElementById("input-left")

    if (+priceMinValue > +priceMinMaximum) {
      document.getElementById("price-filter-max").value = `1000`
      document.getElementById("price-filter-min").value = `10`
    } else if (+priceMinValue < +priceMinMinimum) {
      document.getElementById("price-filter-min").value = `10`
    } else if (!priceMinValue) {
      document.getElementById("price-filter-min").value = `10`
    } else if (+priceMinValue > 950) {
      document.getElementById("price-filter-min").value = `10`
    } 

    leftInput.value = priceMin.value
    this.setState({})
  }

  onBlurPriceMax() {
    this.toggleFocusMax()

    const priceMax = document.getElementById("price-filter-max")
    const priceMaxValue = document.getElementById("price-filter-max").value
    const priceMaxMinimum = document.getElementById("price-filter-max").min
    const priceMaxMaximum = document.getElementById("price-filter-max").max
    const rightInput = document.getElementById("input-right")

    if (+priceMaxValue < +priceMaxMinimum) {
      document.getElementById("price-filter-max").value = `1000`
      document.getElementById("price-filter-min").value = `10`
    } else if (+priceMaxValue > +priceMaxMaximum) {
      document.getElementById("price-filter-max").value = `1000`
    } else if (!priceMaxValue) {
      document.getElementById("price-filter-max").value = `1000`
    } else if (+priceMaxValue < 50) {
      document.getElementById("price-filter-max").value = `1000`
    }

    rightInput.value = priceMax.value
    this.setState({})
  }

  keyInputPriceMin() {
    const priceMin = document.getElementById("price-filter-min")
    const leftInput = document.getElementById("input-left")

    leftInput.value = priceMin.value
    this.setState({})
  }

  keyInputPriceMax() {
    const priceMax = document.getElementById("price-filter-max")
    const rightInput = document.getElementById("input-right")

    rightInput.value = priceMax.value
    this.setState({})
  }

  defaultVal(input) {
    if (document.getElementById("input-left")) {
      if(input === "min") {
        return document.getElementById("input-left").value
      } else {
        return document.getElementById("input-right").value
      }
    } else {
      if (input === "min") {
        return "10"
      } else {
        return "1000"
      }
    }
  }

  clearInputs() {
    this.keyUpClearInput()
    document.getElementById("input-left").value = "10"
    document.getElementById("input-right").value = "1000"
    document.getElementById("price-filter-min").value = "10"
    document.getElementById("price-filter-max").value = "1000"

    this.setState({})
  }

  keyDownClearInput() {
    document.getElementById("clear-input").style.marginLeft = "2px";
    document.getElementById("clear-input").style.marginBottom = "1px";
    document.getElementById("clear-input").style.width = "60px";
    document.getElementById("clear-input").style.height = "38px";
    document.getElementById("clear-input").style.fontSize = "14px";
    
  }
  
  keyUpClearInput() {
      document.activeElement.blur();
      document.getElementById("clear-input").style.marginLeft = "0px";
      document.getElementById("clear-input").style.marginBottom = "0px";
      document.getElementById("clear-input").style.width = "64px";
      document.getElementById("clear-input").style.height = "40px";
      document.getElementById("clear-input").style.fontSize = "15px";    
  }

  keyDownSaveInput() {
    document.getElementById("save-input").style.marginRight = "2px";
    document.getElementById("save-input").style.marginBottom = "1px";
    document.getElementById("save-input").style.width = "60px";
    document.getElementById("save-input").style.height = "38px";
    document.getElementById("save-input").style.fontSize = "13px";
    
  }
  
  keyUpSaveInput() {
      document.activeElement.blur();
      document.getElementById("save-input").style.marginRight = "0px";
      document.getElementById("save-input").style.marginBottom = "0px";
      document.getElementById("save-input").style.width = "64px";
      document.getElementById("save-input").style.height = "40px";
      document.getElementById("save-input").style.fontSize = "14px";    
  }

  saveInputs() {
    this.keyUpSaveInput()
  }

  avgPrice() {
    return this.allPropsOrFiltered(this.state, this.props).reduce((total, amount) => total + amount) / this.allPropsOrFiltered(this.state, this.props).length
  }

  render() {

    const sidenav = (
      <div className="sidenav">
        <ListingMap 
          listings={this.allPropsOrFiltered(this.state, this.props)} 
          updateFilter={this.props.updateFilter } 
          hovered={this.state.hovered}
        />
      </div>
    );

    const ifSearch = (searchTerm) => {
      let text = `Showing results for "${this.state.searchTerm}" in New York`

      if(this.state.searchTerm !== "") {
        return (
        <div className="if-search-container">
          <div className="if-search">{text}</div>
        </div>
        )
      }
    }

    const miniText = () => {
      // DELETE IF OK
      // const propsOrStateStays = () => {
      //   if(this.state.filteredList.length) {
      //     return this.filteredListings(this.state, this.props)
      //   } else {
      //     return this.props.listings
      //   }
      // }
      const numStays = `${this.allPropsOrFiltered(this.state, this.props).length} stays`
      
      const guests = () => {
        if(this.state.guests === 1) {
          return `${this.state.guests} guest`;
        } else {
          return `${this.state.guests} guests`;
        }
      }
      
      const ifStartorEnd = () => {
        
        if(convertMoment(this.state.startDate, this.state.endDate) === "") {
          return ""
        } else {
          return `· ${convertMoment(this.state.startDate, this.state.endDate)}`
        }
      }

      const ifGuests = () => {
        if(this.state.guests) {
          return `· ${guests()}`
        } else {
          return ""
        }
      }

      return `${numStays} ${ifStartorEnd()} ${ifGuests()}`
    }

    const isPriceFilterPressed = () => {
      if(this.state.priceFilterOpen) {
        return "list-header-filter-button-pressed"
      } else {
        return "list-header-filter-button"
      }
    }

    const isMinFocused = () => {
      if(this.state.minFocus) {
        return (
          "price-filter-main-price-range-display-minmax-container-focus"
        )
      } else {
        return (
          "price-filter-main-price-range-display-min-container"
        )
      }
    }
    
    const isMaxFocused = () => {
      if(this.state.maxFocus) {
        return (
          "price-filter-main-price-range-display-minmax-container-focus"
        )
      } else {
        return (
          "price-filter-main-price-range-display-max-container"
        )
      }
    }

    const priceAvg = (state, props) => {
        if(state && props) {
          if (state.filteredList.length) {
            const map = state.filteredList.map(listing => {
              return listing.price
            })
            const sum = map.reduce((total, listing) => total + listing)
            const divisor = state.filteredList.length
            return `The average nightly price is $${(sum / divisor).toFixed(0)}` 
          } else {
            const map = props.listings.map(listing => {
              return listing.price
            })
            const sum = map.reduce((total, listing) => total + listing)
            const divisor = props.listings.length
            return `The average nightly price is $${(sum / divisor).toFixed(0)}` 
          }
        } else {
          return <></>
        }
    }

    const priceFilter = () => {
      if(this.state.priceFilterOpen) {
        return (
          <div 
          className="price-filter-container"
          ref={price => this.price = price}
          >
            <div className="price-filter-main-container">
              <div className="price-filter-main-frame">
                <div className="price-filter-main-avg-text">
                  {priceAvg(this.state, this.props)}
                </div>
                <div className="price-filter-main-display-dir">
                  <div className="price-filter-main-graph-container">
                    <div className="price-filter-main-graph-display-container">
                      <div className="price-filter-main-graph-display1toMany">


                      </div>
                    </div>
                    <div className="price-filter-main-graph-slider-container">
                      <input type="range" id="input-left" min="0" max="1000" defaultValue="10"/>
                      <input type="range" id="input-right" min="0" max="1000" defaultValue="1000"/>
                      <div className="slider">
                        <div className="track"></div>
                        <div className="range"></div>
                        <div className="thumb left">
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                        </div>
                        <div className="thumb right">
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price-filter-main-price-range-display-container">
                    <div 
                    className={isMinFocused()}
                    onBlur={this.onBlurPriceMin}
                    onFocus={this.toggleFocusMin}
                    >
                      <label className="price-filter-main-price-range-display-minmax-frame">
                        <div className="price-filter-main-price-range-display-minmax-text-frame">
                          <div className="price-filter-main-price-range-display-minmax-text">
                            min price
                          </div>
                        </div>
                        <div dir="ltr">
                          <div className="price-filter-main-price-value-container">
                            <div className="price-filter-main-price-value-money">
                              <span>$</span>
                            </div>
                            <input 
                            className="price-filter-main-price-value-input"
                            id="price-filter-min"
                            type="number"
                            readOnly={false}
                            autoComplete="off"
                            defaultValue={this.defaultVal("min")}
                            min="0"
                            max="1000"
                            onKeyUpCapture={this.keyInputPriceMin}
                            >
                            </input>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="price-dash">–</div>
                    <div 
                    className={isMaxFocused()}
                    onBlur={this.onBlurPriceMax}
                    onFocus={this.toggleFocusMax}
                    >
                      <label className="price-filter-main-price-range-display-minmax-frame">
                        <div className="price-filter-main-price-range-display-minmax-text-frame">
                          <div className="price-filter-main-price-range-display-minmax-text">
                            max price
                          </div>
                        </div>
                        <div dir="ltr">
                          <div className="price-filter-main-price-value-container">
                            <div className="price-filter-main-price-value-money">
                              <span>$</span>
                            </div>
                            <input 
                            className="price-filter-main-price-value-input"
                            id="price-filter-max"
                            type="number"
                            readOnly={false}
                            autoComplete="off"
                            min="0"
                            max="1000"
                            defaultValue={this.defaultVal("max")}
                            onKeyUpCapture={this.keyInputPriceMax}
                            >
                            </input>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="price-filter-bottom-container">
              <div className="price-filter-bottom-frame">
                <button 
                className="price-filter-bottom-clear"
                id="clear-input"
                onClick={this.clearInputs}
                onFocus={this.keyDownClearInput}
                onMouseOut={this.keyUpClearInput}>
                  Clear
                </button>
                <div className="price-filter-bottom-save-container">
                  <button 
                  className="price-filter-bottom-save-button"
                  id="save-input"
                  onClick={this.saveInputs}
                  onFocus={this.keyDownSaveInput}
                  onMouseOut={this.keyUpSaveInput}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return <></>
      }
    }
    

    const listIndexItem = (
      <div className="list-body">
        <div className="list-header-container">
          <div className="list-header-top">
            <section>
              <div className="list-header-list-items-mini-text">
                {miniText()}
              </div>
              <div className="list-header-list-items-description">
                <h1 className="list-header-list-items-description-text">
                  Stays in New York
                </h1>
              </div>
            </section>
          </div> 
          <div className="list-header-filter-container">
            <div className="list-header-filter-frame">
              <div className="list-header-filter-frame-inner">
                <div 
                className="list-header-filter-frame-inner-inner"
                ref={priceButton => this.priceButton = priceButton}>
                  <div className="list-header-filter-frame-inner-inner">
                    <div className="list-header-filter-button-container">
                      <button 
                      className={isPriceFilterPressed()}
                      onClick={this.togglePriceFilter}>
                          <span className="list-header-filter-button-text">
                            Price
                          </span>
                      </button>
                    </div>
                    {priceFilter()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {ifSearch(this.state.searchTerm)}
        <ul className="list-items" onMouseLeave={this.unhovered}>
          {this.allPropsOrFiltered(this.state, this.props).map(listing => (
            <ListingIndexItem 
            listing={listing} 
            key={listing.id} 
            setHoveredListItem={this.setHoveredListItem}
            allReviews={this.props.allReviews}
            />
          ))}
        </ul >
        <div className="list-items-bottom-container">
          <div className="list-items-bottom-frame">
            <div className="list-items-bottom-text-main-container">
              <div className="list-items-bottom-text-main-frame">
                <div className="list-items-bottom-text-main-text">
                  1
                  <span> - </span>
                  {`${this.props.listings.length} `}
                  {`  of `}
                  {`${this.props.listings.length} places to stay`}
                </div>
              </div>
            </div>
            <div className="list-items-bottom-text-bottom-container">
              <div className="list-items-bottom-text-bottom-text">
                Additional fees apply. Taxes may be added.
              </div>
            </div>
          </div>
        </div>
        <div className="footer-buffer">footer</div>
      </div>
    )

    const hiddenShadow = (
      <div className="hidden-shadow">hello</div>
    )

    return (
      <div className="index-body">
          {hiddenShadow}
          <Navbar 
          searchTerm={this.state.searchTerm}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          guests={this.state.guests}
          />
          {listIndexItem}
          {sidenav}
      </div>
    );
  }
}
