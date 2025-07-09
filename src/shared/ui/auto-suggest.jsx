// // widgets/SearchInputWithSuggest.jsx

// import React, { useState } from "react";
// import Autosuggest from "react-autosuggest";
// import { useAutoSuggestStore } from "../../entities/product/api/auto-suggest.js"

// // Sample product list (replace with API later)
// // const products = [
// //   { name: "Apples" },
// //   { name: "Bananas" },
// //   { name: "Milk" },
// //   { name: "Bread" },
// //   { name: "Orange Juice" },
// //   { name: "Eggs" },
// // ];

// const { fetchSuggestedProducts } = useAutoSuggestStore();


// // Suggestion logic
// const getSuggestions = (value) => {
//   const input = value.trim().toLowerCase();
//   return input.length === 0
//     ? []
//     : fetchSuggestedProducts.filter((name) =>
//         name.toLowerCase().includes(input)
//       );    
// };

// const getSuggestionValue = (suggestion) => suggestion.name;

// const renderSuggestion = (suggestion) => (
//   <div className="px-4 py-2 cursor-pointer hover:bg-gray-100">
//     {suggestion.name}
//   </div>
// );

// const Autosuggest = () => {
//   const [value, setValue] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const onChange = (e, { newValue }) => {
//     setValue(newValue);
//   };

//   const onSuggestionsFetchRequested = ({ value }) => {
//     setSuggestions(getSuggestions(value));
//   };

//   const onSuggestionsClearRequested = () => {
//     setSuggestions([]);
//   };

//   const inputProps = {
//     placeholder: "Search products...",
//     value,
//     onChange,
//   };

//   return (
//     <Autosuggest
//       suggestions={suggestions}
//       onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//       onSuggestionsClearRequested={onSuggestionsClearRequested}
//       getSuggestionValue={getSuggestionValue}
//       renderSuggestion={renderSuggestion}
//       inputProps={inputProps}
//     />
//   );
// };

// export default Autosuggest;
