import iconArrowRight from '../../assets/arrow-right.svg'

export function Soluction({ cases }) {
  return (
    <>
      {cases.map((casesItem, index) => (
        <div className="soluction-card" key={index}>
          <h1>{casesItem.title}</h1>
          <p>{casesItem.description}</p>
          <a href={casesItem.link} type="button">
            Saiba mais
            <img
              className="icon-right"
              src={iconArrowRight}
              alt="icon-arrow-right"
            />
          </a>
        </div>
      ))}
    </>
  )
}
