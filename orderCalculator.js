
// orderCalculator.js

function calculateOrder(price, quantity, discountPercent = 0) {

  // ตรวจสอบข้อมูล
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("ราคาสินค้าต้องมากกว่า 0 บาท");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("จำนวนสินค้าต้องอย่างน้อย 1 ชิ้น");
  }

  if (
    !Number.isFinite(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    throw new Error("ส่วนลดต้องอยู่ระหว่าง 0-100%");
  }

  // คำนวณราคา
  const subtotal = price * quantity;
  const discount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discount;
  const vat = taxableAmount * 0.07;
  const grandTotal = taxableAmount + vat;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    vat: Number(vat.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2))
  };
}

// ทดลองใช้งาน
const result = calculateOrder(1000, 2, 10);

console.log("===== ORDER CALCULATOR =====");
console.log("ราคาสินค้า:", result.subtotal, "บาท");
console.log("ส่วนลด:", result.discount, "บาท");
console.log("ภาษี VAT 7%:", result.vat, "บาท");
console.log("ยอดชำระทั้งหมด:", result.grandTotal, "บาท");
console.log("============================");
