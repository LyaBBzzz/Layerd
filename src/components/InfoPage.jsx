import React from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { ArrowLeft } from 'lucide-react';

export const InfoPage = () => {
  const { language, activeInfoPage, t, navigateTo } = useShop();

  const contentMap = {
    contact: {
      title: { en: "Contact Us", ru: "Связаться с нами" },
      content: {
        en: "We are available 24/7 to assist you. Reach out to us via email at support@layered.com or call us at +1 (800) 123-4567. For press inquiries, please contact press@layered.com.",
        ru: "Мы доступны 24/7, чтобы помочь вам. Свяжитесь с нами по электронной почте support@layered.com или позвоните по телефону +1 (800) 123-4567. По вопросам прессы обращайтесь на press@layered.com."
      }
    },
    shipping: {
      title: { en: "Shipping & Returns", ru: "Доставка и возврат" },
      content: {
        en: "We offer complimentary express shipping globally. All orders are dispatched within 24 hours. If you are not completely satisfied with your purchase, returns are accepted within 30 days of delivery. Items must be in their original condition.",
        ru: "Мы предлагаем бесплатную экспресс-доставку по всему миру. Все закасы отправляются в течение 24 часов. Если вы не полностью удовлетворены своей покупкой, возвраты принимаются в течение 30 дней с момента доставки. Товары должны быть в оригинальном состоянии."
      }
    },
    faq: {
      title: { en: "Frequently Asked Questions", ru: "Частые вопросы" },
      content: {
        en: "Q: Are your products authentic? A: Yes, all products are 100% authentic and sourced directly from brands. Q: Do you ship internationally? A: Yes, we ship to over 150 countries worldwide. Q: What payment methods do you accept? A: We accept all major credit cards, PayPal, and Apple Pay.",
        ru: "В: Ваши товары оригинальные? О: Да, все товары 100% оригинальные и поставляются напрямую от брендов. В: Осуществляете ли вы международную доставку? О: Да, мы доставляем в более чем 150 стран мира. В: Какие способы оплаты вы принимаете? О: Мы принимаем все основные кредитные карты, PayPal и Apple Pay."
      }
    },
    story: {
      title: { en: "Our Story", ru: "Наша история" },
      content: {
        en: "Founded in 2026, LAYERED started with a simple mission: to curate the world's most exceptional clothing and accessories. We believe in the intersection of art and commerce, treating every item we sell as a piece of functional art.",
        ru: "Основанная в 2026 году, компания LAYERED началась с простой миссии: собирать самую исключительную одежду и аксессуары в мире. Мы верим в пересечение искусства и коммерции, относясь к каждому продаваемому товару как к произведению функционального искусства."
      }
    },
    careers: {
      title: { en: "Careers", ru: "Вакансии" },
      content: {
        en: "Join our global team of fashion enthusiasts, technologists, and creatives. We are always looking for passionate individuals to help us shape the future of luxury e-commerce. Check our LinkedIn page for current openings.",
        ru: "Присоединяйтесь к нашей глобальной команде энтузиастов моды, технологов и креативщиков. Мы всегда ищем увлеченных людей, которые помогут нам формировать будущее люксовой электронной коммерции. Ознакомьтесь с нашими текущими вакансиями на нашей странице в LinkedIn."
      }
    },
    legal: {
      title: { en: "Legal & Privacy", ru: "Правовая информация" },
      content: {
        en: "Your privacy is of utmost importance to us. We implement robust security measures to protect your personal information. By using our website, you agree to our Terms of Service and Privacy Policy. For detailed information, please download our comprehensive legal document.",
        ru: "Ваша конфиденциальность имеет для нас первостепенное значение. Мы внедряем надежные меры безопасности для защиты вашей личной информации. Используя наш веб-сайт, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности. Для получения подробной информации скачайте наш всеобъемлющий юридический документ."
      }
    },
    privacy: {
      title: { en: "Privacy Policy", ru: "Политика конфиденциальности" },
      content: {
        en: "At LAYERED, we prioritize the protection of your personal data. We collect information only to enhance your shopping experience and process orders securely. We never sell your data to third parties. For full details on how we use and store your information, please review our comprehensive privacy guidelines.",
        ru: "В LAYERED мы уделяем первостепенное внимание защите ваших личных данных. Мы собираем информацию только для того, чтобы улучшить ваш опыт покупок и безопасно обрабатывать заказы. Мы никогда не продаем ваши данные третьим лицам. Для получения полной информации о том, как мы используем и храним вашу информацию, ознакомьтесь с нашими подробными правилами конфиденциальности."
      }
    },
    terms: {
      title: { en: "Terms of Service", ru: "Условия обслуживания" },
      content: {
        en: "These Terms of Service govern your use of the LAYERED website and services. By accessing or shopping on our platform, you agree to abide by these terms. We reserve the right to update these policies at any time. Please ensure you read them carefully before making any purchases.",
        ru: "Эти Условия обслуживания регулируют использование вами веб-сайта и услуг LAYERED. Получая доступ к нашей платформе или совершая покупки на ней, вы соглашаетесь соблюдать эти условия. Мы оставляем за собой право обновлять эти политики в любое время. Пожалуйста, внимательно прочтите их перед совершением любых покупок."
      }
    }
  };

  const pageData = contentMap[activeInfoPage] || contentMap['contact'];

  return (
    <div className="w-full min-h-screen bg-[#f4f4f4] pt-32 pb-24 px-4 lg:px-24 overflow-y-auto">
      <div className="max-w-3xl mx-auto mt-4">
        <button 
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>{language === 'ru' ? 'Вернуться в каталог' : 'Back to Catalog'}</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 lg:p-20 shadow-xl rounded-3xl relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -mr-32 -mt-32 z-0" />
          
          <div className="relative z-10">
            <div className="w-12 h-1 bg-black mb-8"></div>
            <h1 className="font-anton text-4xl md:text-5xl uppercase tracking-wider text-black mb-10">
              {pageData.title[language]}
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-500 font-medium leading-relaxed">
              {pageData.content[language].split(' Q:').map((paragraph, idx) => {
                // Formatting specific to FAQ
                if (activeInfoPage === 'faq' && idx > 0) {
                  return <p key={idx} className="mb-6"><strong className="text-black">Q:</strong> {paragraph}</p>;
                } else if (activeInfoPage === 'faq' && paragraph.startsWith('Q:')) {
                  return <p key={idx} className="mb-6"><strong className="text-black">Q:</strong> {paragraph.substring(2)}</p>;
                }
                
                // Formatting specific to Russian FAQ
                if (activeInfoPage === 'faq' && language === 'ru') {
                  const parts = paragraph.split(' В:');
                  if (parts.length > 1) {
                    return parts.map((p, i) => (
                      <p key={i} className="mb-6">
                        {p.startsWith('В:') ? p : i > 0 ? <><strong className="text-black">В:</strong> {p}</> : p}
                      </p>
                    ));
                  }
                }

                return <p key={idx} className="mb-6">{paragraph}</p>;
              })}
            </div>
            
            {activeInfoPage === 'contact' && (
              <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-black">Email</h3>
                  <a href="mailto:support@layered.com" className="text-gray-500 hover:text-black transition-colors font-medium">support@layered.com</a>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-black">Phone</h3>
                  <p className="text-gray-500 font-medium">+1 (800) 123-4567</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
