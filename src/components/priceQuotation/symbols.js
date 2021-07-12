function importAll(r) {
  let images = [];
  r.keys().map((title, index) => {
    let obj = { item: "", photo: "", price: "" };
    obj.photo = r(title).default;
    let str = title.replace("./", "");
    obj.item = str.slice(0, -4);
    obj.price = str.length * 2.5 + 20;

    images.push(obj);
    //    console.log(obj.photo);
  });
  return images;
}
const images = importAll(
  require.context(
    "../../components/priceQuotation/symbols",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

export default images;
