import "./LinkContainer.css";

const LinkContainer = ({ links }) => {
  return (
    <div className="link-container">
      {links.map((link, index) => {
        return (
          <a key={`link-${index}`} href={link.link} target="_blank">
            <img src={link.imgSrc} className={"logo " + link?.classes} />
          </a>
        );
      })}
    </div>
  );
};

export default LinkContainer;
