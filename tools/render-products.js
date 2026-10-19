// Prints the product cards for one grid, so pages can ship them pre-rendered.
// Usage: node tools/render-products.js <coffee|apparel|all> [limit]
global.window = global;
require("../js/data.js");
const [type, limit] = process.argv.slice(2);
const list = SHOP.products.filter((p) => type === "all" || p.type === type).slice(0, +limit || Infinity);
process.stdout.write(list.map(SHOP.productCard).join(""));
