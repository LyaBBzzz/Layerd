import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { ArrowLeft } from 'lucide-react';

export const Blog = () => {
  const { language } = useShop();
  const [activePostId, setActivePostId] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: {
        en: "The Evolution of Minimalist Sneakers",
        ru: "Эволюция минималистичных кроссовок"
      },
      category: "Style",
      date: "Oct 12, 2026",
      image: "/images/Blog/MinimalisticSneackers.jpg",
      excerpt: {
        en: "Exploring how luxury brands have redefined the classic white sneaker over the past decade, turning an athletic staple into a high-fashion necessity.",
        ru: "Исследование того, как люксовые бренды переосмыслили классические белые кроссовки за последнее десятилетие, превратив спортивную базу в необходимость высокой моды."
      },
      content: {
        en: [
          "The white sneaker has undergone a profound transformation. What was once strictly reserved for the tennis court or the gym has now become a cornerstone of the modern luxury wardrobe. This shift wasn't sudden, but rather a slow integration of athletic aesthetics into high-fashion sensibilities.",
          "Brands like Common Projects paved the way with their Achilles Low, introducing the idea that a sneaker could be as impeccably crafted as a dress shoe. Stripping away oversized logos and bold colorways, they presented a silhouette that relied entirely on the quality of its Italian leather and the precision of its stitching.",
          "Today, every major fashion house has their interpretation. The appeal lies in the versatility. A minimalist sneaker effortlessly bridges the gap between casual and formal, perfectly complementing both a tailored suit and weekend denim. It represents a broader cultural shift towards relaxed elegance, where comfort no longer compromises style.",
          "As we look to the future, the focus is shifting towards sustainability. The next evolution of the minimalist sneaker won't just be about aesthetic purity, but material innovation—utilizing vegan leathers, recycled rubber, and ethical production methods without sacrificing the premium feel that defines luxury."
        ],
        ru: [
          "Белые кроссовки претерпели глубокую трансформацию. То, что когда-то предназначалось исключительно для теннисного корта или спортзала, теперь стало краеугольным камнем современного роскошного гардероба. Этот сдвиг не был внезапным, скорее это была медленная интеграция спортивной эстетики в высокую моду.",
          "Такие бренды, как Common Projects, проложили путь со своей моделью Achilles Low, представив идею о том, что кроссовки могут быть созданы так же безупречно, как и классические туфли. Избавившись от огромных логотипов и ярких цветов, они представили силуэт, который полностью опирался на качество итальянской кожи и точность строчки.",
          "Сегодня у каждого крупного дома моды есть своя интерпретация. Привлекательность заключается в универсальности. Минималистичные кроссовки легко стирают грань между повседневным и формальным стилем, идеально дополняя как сшитый на заказ костюм, так и джинсы выходного дня. Это отражает более широкий культурный сдвиг в сторону расслабленной элегантности, где комфорт больше не вредит стилю.",
          "Заглядывая в будущее, мы видим смещение фокуса в сторону экологичности. Следующая эволюция минималистичных кроссовок будет связана не только с эстетической чистотой, но и с инновациями в материалах: использованием веганской кожи, переработанной резины и этичных методов производства без ущерба для премиального качества, определяющего люкс."
        ]
      }
    },
    {
      id: 2,
      title: {
        en: "Craftsmanship in Modern Leather Goods",
        ru: "Мастерство в современных кожаных изделиях"
      },
      category: "Design",
      date: "Sep 28, 2026",
      image: "/images/Blog/LeatherGoods.jpg",
      excerpt: {
        en: "A deep dive into the artisanal techniques preserving the heritage of leather craftsmanship amidst the rise of fast fashion.",
        ru: "Глубокое погружение в ремесленные техники, сохраняющие наследие кожевенного мастерства в эпоху быстрой моды."
      },
      content: {
        en: [
          "In an era dominated by mass production and fleeting trends, the enduring appeal of handcrafted leather goods stands as a testament to the value of patience and skill. True luxury is not born on an assembly line; it is shaped by the hands of artisans who have spent decades mastering their craft.",
          "The process begins long before the first cut. Selecting the perfect hide requires an expert eye—understanding the grain, the thickness, and the natural imperfections that give the leather its unique character. Traditional tanning methods, particularly vegetable tanning using natural extracts, are seeing a resurgence as consumers demand more environmentally conscious processes.",
          "The hallmark of modern leather craftsmanship is the meticulous attention to detail. Edge painting, hand-stitching (often using the traditional saddle stitch), and precise burnishing elevate a simple bag or wallet into a piece of functional art. These techniques cannot be rushed or perfectly replicated by machines.",
          "By investing in artisanal leather goods, we are not just purchasing an accessory; we are preserving a heritage. We are choosing pieces designed to age gracefully, acquiring a unique patina over time that tells the story of the wearer—a stark, beautiful contrast to the disposable nature of fast fashion."
        ],
        ru: [
          "В эпоху, где доминируют массовое производство и мимолетные тренды, непреходящая привлекательность кожаных изделий ручной работы служит свидетельством ценности терпения и мастерства. Истинная роскошь не рождается на конвейере; она создается руками ремесленников, которые десятилетиями оттачивали свое искусство.",
          "Процесс начинается задолго до первого разреза. Выбор идеальной шкуры требует опытного взгляда — понимания текстуры, толщины и естественных несовершенств, которые придают коже ее уникальный характер. Традиционные методы дубления, особенно растительное дубление с использованием натуральных экстрактов, переживают возрождение, поскольку потребители требуют более экологичных процессов.",
          "Отличительной чертой современного кожевенного мастерства является скрупулезное внимание к деталям. Окрашивание краев, ручная строчка (часто с использованием традиционного седельного шва) и точная полировка превращают простую сумку или бумажник в предмет функционального искусства. Эти техники не терпят спешки и не могут быть идеально воспроизведены машинами.",
          "Инвестируя в ремесленные кожаные изделия, мы не просто покупаем аксессуар; мы сохраняем наследие. Мы выбираем вещи, созданные для того, чтобы красиво стареть, приобретая со временем уникальную патину, которая рассказывает историю владельца — резкий, прекрасный контраст с одноразовой природой быстрой моды."
        ]
      }
    },
    {
      id: 3,
      title: {
        en: "Curating the Perfect Autumn Wardrobe",
        ru: "Создание идеального осеннего гардероба"
      },
      category: "Editorial",
      date: "Sep 15, 2026",
      image: "/images/Blog/Autumn.jpg",
      excerpt: {
        en: "Essential pieces for transitioning your style into the cooler months, focusing on layering, textures, and timeless silhouettes.",
        ru: "Ключевые вещи для перехода вашего стиля в холодные месяцы с акцентом на многослойность, текстуры и вневременные силуэты."
      },
      content: {
        en: [
          "Autumn is the season where fashion truly comes alive. The oppressive heat of summer fades, making way for the rich complexity of layering, profound textures, and a deeper, more sophisticated color palette. Curating the perfect autumn wardrobe is about balancing comfort with structured elegance.",
          "The foundation of any strong fall look begins with outerwear. A meticulously tailored wool overcoat in camel or charcoal provides an instant upgrade to even the simplest outfit. For more casual days, a premium leather jacket offers an edge that only gets better with wear.",
          "Texture plays a pivotal role. Chunky cashmere knits, ribbed turtlenecks, and heavy corduroy bring a tactile dimension to your style. These materials not only provide warmth but also interact beautifully with the soft, golden light of autumn.",
          "Finally, footwear transitions from the lightness of summer to substantial, protective silhouettes. The Chelsea boot remains an undisputed champion of versatility, seamlessly pairing with both tailored trousers and raw denim. Building a fall wardrobe isn't about chasing trends; it's about investing in high-quality staples that you will look forward to wearing year after year."
        ],
        ru: [
          "Осень — это сезон, когда мода по-настоящему оживает. Удушающая летняя жара отступает, уступая место богатой сложности многослойности, глубоким текстурам и более темной, изысканной цветовой палитре. Создание идеального осеннего гардероба — это баланс между комфортом и структурированной элегантностью.",
          "Основа любого сильного осеннего образа начинается с верхней одежды. Тщательно скроенное шерстяное пальто цвета кэмел или графит мгновенно преобразит даже самый простой наряд. Для более расслабленных дней кожаная куртка премиум-класса добавит дерзости, которая со временем становится только лучше.",
          "Текстура играет ключевую роль. Объемный кашемировый трикотаж, водолазки в рубчик и плотный вельвет привносят тактильное измерение в ваш стиль. Эти материалы не только согревают, но и прекрасно взаимодействуют с мягким золотистым осенним светом.",
          "Наконец, обувь переходит от летней легкости к основательным, защитным силуэтам. Ботинки челси остаются неоспоримым чемпионом универсальности, безупречно сочетаясь как со строгими брюками, так и с грубым денимом. Создание осеннего гардероба — это не погоня за трендами; это инвестиция в высококачественные базовые вещи, которые вы будете с нетерпением ждать, чтобы надеть год за годом."
        ]
      }
    },
    {
      id: 4,
      title: {
        en: "Architectural Influences in Accessory Design",
        ru: "Архитектурное влияние в дизайне аксессуаров"
      },
      category: "Culture",
      date: "Aug 02, 2026",
      image: "/images/Blog/Accesories.jpg",
      excerpt: {
        en: "How brutalist architecture and modern structural forms are dictating the shape and function of the next generation of luxury bags.",
        ru: "Как бруталистская архитектура и современные структурные формы диктуют форму и функцию следующего поколения люксовых сумок."
      },
      content: {
        en: [
          "The lines between architecture and fashion are becoming increasingly blurred. Nowhere is this more evident than in the realm of contemporary accessory design. Designers are abandoning soft, slouchy silhouettes in favor of rigid, structural forms that echo the monumental buildings defining our modern skylines.",
          "Brutalism, with its emphasis on raw materials and geometric shapes, has become a significant source of inspiration. We are seeing luxury bags with sharp, asymmetric angles, exposed hardware that mimics industrial scaffolding, and materials that mimic the cold, unyielding nature of concrete and steel.",
          "This architectural approach to design isn't just about aesthetics; it profoundly impacts function. A structured bag protects its contents better and maintains its imposing shape regardless of what it holds. The construction techniques borrowed from industrial design result in accessories that are remarkably durable.",
          "These pieces are statement items, designed for the individual who views fashion as a form of wearable art. As luxury continues to evolve, the intersection of structural engineering and high-end fashion promises to yield some of the most innovative and striking designs of the decade."
        ],
        ru: [
          "Границы между архитектурой и модой становятся все более размытыми. Нигде это не проявляется так ярко, как в сфере современного дизайна аксессуаров. Дизайнеры отказываются от мягких, бесформенных силуэтов в пользу жестких, структурных форм, которые перекликаются с монументальными зданиями, определяющими современные горизонты.",
          "Брутализм, с его акцентом на необработанные материалы и геометрические формы, стал значительным источником вдохновения. Мы видим люксовые сумки с острыми, асимметричными углами, открытой фурнитурой, имитирующей промышленные строительные леса, и материалами, которые подражают холодной, непреклонной природе бетона и стали.",
          "Этот архитектурный подход к дизайну касается не только эстетики; он глубоко влияет на функцию. Структурированная сумка лучше защищает свое содержимое и сохраняет внушительную форму независимо от того, что в ней находится. Методы конструирования, заимствованные из промышленного дизайна, приводят к созданию удивительно долговечных аксессуаров.",
          "Эти вещи — акцентные элементы, созданные для тех, кто рассматривает моду как форму носимого искусства. По мере того, как люкс продолжает развиваться, пересечение структурной инженерии и высокой моды обещает подарить одни из самых инновационных и поразительных дизайнов десятилетия."
        ]
      }
    }
  ];

  const activePost = blogPosts.find(p => p.id === activePostId);

  return (
    <div className="w-full min-h-screen bg-[#f4f4f4] pt-32 pb-24 px-4 lg:px-24 overflow-y-auto">
      <div className="max-w-5xl mx-auto relative">
        <AnimatePresence mode="wait">
          {!activePost ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
              >
                <h1 className="font-anton text-6xl md:text-8xl uppercase tracking-wider text-black mb-4">
                  {language === 'ru' ? 'Журнал' : 'Journal'}
                </h1>
                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">
                  {language === 'ru' ? 'Истории, стиль и культура' : 'Stories, Style, and Culture'}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {blogPosts.map((post, i) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => {
                      setActivePostId(post.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-200 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                      <img 
                        src={post.image} 
                        alt={post.title[language]} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black border border-black rounded-full px-3 py-1">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {post.date}
                      </span>
                    </div>
                    
                    <h2 className="font-anton text-2xl md:text-3xl uppercase tracking-wide mb-4 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {post.title[language]}
                    </h2>
                    
                    <p className="text-gray-500 text-sm leading-relaxed font-medium mb-6 line-clamp-3">
                      {post.excerpt[language]}
                    </p>
                    
                    <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                      {language === 'ru' ? 'Читать далее' : 'Read More'} &rarr;
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="article"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <button 
                onClick={() => setActivePostId(null)}
                className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12"
              >
                <ArrowLeft size={16} />
                <span>{language === 'ru' ? 'Назад в журнал' : 'Back to Journal'}</span>
              </button>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black border border-black rounded-full px-3 py-1">
                  {activePost.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {activePost.date}
                </span>
              </div>

              <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-wide text-black mb-8 leading-tight">
                {activePost.title[language]}
              </h1>

              <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 bg-gray-200">
                <img 
                  src={activePost.image} 
                  alt={activePost.title[language]} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed space-y-8">
                <p className="text-xl font-bold text-black mb-8">
                  {activePost.excerpt[language]}
                </p>
                
                {activePost.content[language].map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-20 pt-10 border-t border-gray-200 flex justify-between items-center">
                <button 
                  onClick={() => setActivePostId(null)}
                  className="text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors"
                >
                  &larr; {language === 'ru' ? 'Все статьи' : 'All Articles'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
