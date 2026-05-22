const fs = require('fs');
let code = fs.readFileSync('src/components/Home.jsx', 'utf8');

// Add imports
code = code.replace(
  "import { Footer } from './Footer';",
  "import { Footer } from './Footer';\nimport { HomeGallery } from './views/HomeGallery';\nimport { HomeList } from './views/HomeList';"
);

// We want to replace the content of <motion.div key={`gallery-view-${activeDepartment}-${activeCategory}`} ...>
// up to the end of that block.
// And similarly for the list view.

// To be safe, we can use regex or just replace the chunks between known strings.
const startGallery = "{/* 3D Gallery Section */}";
const endGallery = "</motion.div>\n        </AnimatePresence>\n      ) : (";

const galleryReplacement = `
            <HomeGallery 
              galleryProducts={galleryProducts}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              language={language}
              t={t}
              navigateTo={navigateTo}
              formatPrice={formatPrice}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlistItems={wishlistItems}
              sizes={sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              galleryBlur={galleryBlur}
              galleryOpacity={galleryOpacity}
              galleryY={galleryY}
              zoomedImage={zoomedImage}
              setZoomedImage={setZoomedImage}
            />
          `;

let part1 = code.split(startGallery)[0];
let rest = code.split(startGallery)[1];
let part2 = rest.split(endGallery)[1];

code = part1 + galleryReplacement + "\n          " + endGallery + part2;

const startList = "className=\"w-full max-w-5xl mx-auto pb-12\"\n          >";
const endList = "</motion.div>\n        </AnimatePresence>\n      )}";

const listReplacement = `className="w-full max-w-5xl mx-auto pb-12"
          >
            <HomeList 
              displayedProducts={displayedProducts}
              language={language}
              t={t}
              filterSize={filterSize}
              setFilterSize={setFilterSize}
              allAvailableSizes={allAvailableSizes}
              filterColor={filterColor}
              setFilterColor={setFilterColor}
              allAvailableColors={allAvailableColors}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          `;

let p1 = code.split(startList)[0];
let p2 = code.split(startList)[1].split(endList)[1];

code = p1 + listReplacement + "\n          " + endList + p2;

fs.writeFileSync('src/components/Home.jsx', code);
console.log("Done");
