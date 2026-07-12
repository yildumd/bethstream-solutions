import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { MdStar, MdFormatQuote } from "react-icons/md";
import { TESTIMONIALS } from "../../constants";

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title mb-3">What Our Clients Say</h2>
          <p className="section-sub max-w-xl mx-auto">
            Trusted by hundreds of businesses across Lagos and Nigeria.
          </p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10">
          {TESTIMONIALS.map(t => (
            <SwiperSlide key={t.id}>
              <div className="card p-6 h-full">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <MdStar key={i} className="text-yellow-400" size={15} />
                  ))}
                </div>
                <p className="text-brand-gray text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-brand-border pt-4">
                  <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-slate text-sm">{t.name}</p>
                    <p className="text-brand-gray text-xs">{t.role} · {t.company}</p>
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
