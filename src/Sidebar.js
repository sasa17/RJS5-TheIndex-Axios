import React from "react";

const Sidebar = props => {
  return (
    <div id="sidebar">
      <img src="theindex.svg" className="logo" alt="the index logo" />
      <section>
        <h4 className="menu-item active">
          <button onClick={props.unselectAuthor}>AUTHORS</button>
        </h4>
      </section>
    </div>
  );
};

export default Sidebar;
