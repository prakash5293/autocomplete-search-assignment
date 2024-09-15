import React,{useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Card from "./Card/Card";
import { getAuthors, getSummaries } from "../../utils/utils";
import "./CardList.css";

const CardList = ({selectedTitle}) => {

    const [bookDetail, setBookDetail] = useState([]);

    useEffect(() => {
    if(Object.keys(selectedTitle).length > 0){
        const {id, titleName} = selectedTitle;
        const itemExists = bookDetail.some(book => book.id === selectedTitle.id);
        if(!itemExists){
           
          const author = getAuthors().find((author) => author.book_id === id)?.author;
          const summary = getSummaries().find((summary) => summary.id === id)?.summary;
          const selectedData = {id, author, title: titleName, summary}
          setBookDetail((prevState) => [...prevState, selectedData]);
        }
    }

    }, [selectedTitle]);

    return(
        <div className="card-container" data-testid="card-list">
            { bookDetail.map((item, index) => (
            <Card data={item} key={index}/>
        ))}
        </div>

    )
}

CardList.defaultProps = {
    selectedTitle: {}
  };
  
CardList.propTypes = {
selectedTitle: PropTypes.object
};

export default CardList;