import './styles.css';

const ProductFilter = () => {
  return (
    <form className="product-filter-form">
      <div className="base-card product-filter-container">
        <select className="product-filter-select" name="" id="">
          <option value="">Drama</option>
          <option value="">Terror</option>
          <option value="">Comédia</option>
        </select>
      </div>
    </form>
  );
};

export default ProductFilter;
