import React, { useState } from "react";

function Notes() {

const [isInputOpen, toggleInput] = useState(false);

  return (
    <section style={{ height: "75vh" }}>
      <div
        style={{
          margin: "0 auto",
          width: "60%",
          minHeight: "60px",
          background: "#fefefe",
          borderRadius: "5px",
          alignSelf: "",
          boxShadow: "1px 1px 8px 1px rgba(89,89,89,0.53)",
          padding: "20px"
        }}
      >
        <div style={{  
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',}}>
        <input onClick={(e)=>toggleInput(true)} style={{background: 'transparent', border: 'none', color: '#666', outline: 'none', fontSize: '20px'}} placeholder="Utwórz notatkę..." type="text"/>
        <i className="far fa-check-square fa-lg" style={{color: "#666"}}/>
        </div>
        {
          isInputOpen ? 
(          <div>
  <input onClick={(e)=>toggleInput(true)} style={{background: 'transparent', border: 'none', color: '#666', outline: 'none', fontSize: '20px'}} placeholder="Utwórz notatkę..." type="text"/>
</div>)
          :
          ""  
      }
        
      </div>
    </section>
  );
}

export default Notes;
