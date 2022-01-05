import "./SectionTitle.css";

const SectionTitle = (props) => {
  return (
    <div className={"section-title " + props.className} >
      <h1 className="top">{props.header}</h1>
      <h1 className="bottom">{props.descriptor}</h1>
    </div>
  );
};

export default SectionTitle;
