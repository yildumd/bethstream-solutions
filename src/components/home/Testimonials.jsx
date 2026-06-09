import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { MdStar, MdFormatQuote } from "react-icons/md";
import { TESTIMONIALS } from "../../constants";

export default function Testimonials() {
  return (
    <section className="section-padding bg-white/2">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="badge-purple inline-block mb-3">Testimonials</p>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="glass-card p-6 h-full border border-white/10 hover:border-purple-400/20 transition-all">
                <MdFormatQuote className="text-purple-400/40 mb-3" size={32} />
                <p className="text-white/60 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <MdStar key={i} className="text-yellow-400" size={14} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-sky-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
