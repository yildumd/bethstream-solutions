import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import ProductCard from "../products/ProductCard";
import { getProducts } from "../../services/productService";
import { staggerContainer, staggerItem } from "../../animations/variants";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ featured: true, limit: 4 }).then(p => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="badge-purple mb-3">Featured Products</p>
            <h2 className="section-title">
              Top <span className="gradient-text">Security Products</span>
            </h2>
            <p className="section-subtitle mt-3">
              Handpicked professional-grade equipment trusted by Nigerian businesses.
            </p>
          </div>
          <Link to="/shop" className="btn-secondary flex-shrink-0">
            View All <MdArrowForward size={18} />
          </Link>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton aspect-square rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map(p => (
              <motion.div key={p.id} variants={staggerItem}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
