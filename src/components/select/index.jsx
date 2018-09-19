import React from "react";
import PropTypes from "prop-types";

import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import style from "./style.css";

class Select extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      listOpen: false
    }
  }

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  selectListItem = (value = undefined, title = undefined, img = undefined) => {
    const {selectItem} = this.props;

    selectItem(value, title, img);
    this.toggleList();
  }

  renderItems = () => {
    const {list} = this.props;

    const listStyle = {
      minWidth: '98%',
      boxShadow : "0 8px 20px 0 rgba(0, 0, 0, 0.09)",
    }

    return (
      <ul className={style.list} style={listStyle}>
        {/* <li className={style.listItem}
          onClick={() => this.selectListItem()}
        >
          Select a coin..
        </li> */}
        {
          list.map((item, id) => (
            <li className={style.listItem}
              key={id}
              onClick={() => this.selectListItem(item.value, item.title, item.img)}
            >{item.img ? <img src={item.img} alt={item.title} /> : ''} {item.title}</li>
          ))
        }
      </ul>
    );
  }

  handleClick = (ev) => {
    if (this.selectMenu && !this.selectMenu.contains(ev.target)) {
      // If click outside, close the dropdown
      this.setState({
        ...this.state,
        listOpen: false
      });
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.addEventListener('click', this.handleClick);
  }

  render() {
    const{ title, titleImg, error} = this.props;
    const{listOpen} = this.state

    const wrapperStyle = {
      maxWidth: '88.5%',
      borderBottom: `1px solid ${error ? '#f44336' : '#3b1878'}`,
    }

    return(
      <div className={style.wrapper} style={wrapperStyle} ref={el => this.selectMenu = el}>
        <div className={style.header} onClick={() => this.toggleList()}>
          <div className={style.title}>
            {titleImg ? <img src={titleImg} alt={title} /> : ''} {title}
          </div>
          <div className={style.icon}>
            {listOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>
        </div>

        {listOpen && this.renderItems()}
      </div>
    )
  }
}

Select.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired,
  titleImg: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default Select;
