
/**
 * orderCalculator.ts
 * ระบบคำนวณราคาสินค้าและภาษี
 */

// ขั้นตอนที่ 1: กำหนดประเภทการชำระเงิน
export type PaymentType =
  | "CASH"
  | "PROMPTPAY"
  | "CREDIT_CARD";

// ขั้นตอนที่ 2: กำหนดข้อมูลรับเข้า
export interface OrderItemInput {
  orderId: string;
  price: number;
  quantity: number;
  discountPercent?: number;
  paymentType: PaymentType;
}

// ขั้นตอนที่ 3: กำหนดข้อมูลผลลัพธ์
export interface OrderCalculationResult {
  orderId: string;
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  grandTotal: number;
}

// ขั้นตอนที่ 4: ฟังก์ชันคำนวณราคา
export function calculateOrder(
  order: OrderItemInput
): OrderCalculationResult {

  // ตรวจสอบ Order ID
  if (!order.orderId || !order.orderId.trim()) {
    throw new Error("กรุณาระบุ Order ID");
  }

  // ตรวจสอบราคา
  if (!Number.isFinite(order.price) || order.price <= 0) {
    throw new Error("ราคาสินค้าต้องมากกว่า 0 บาท");
  }

  // ตรวจสอบจำนวนสินค้า
  if (
    !Number.isInteger(order.quantity) ||
    order.quantity <= 0
  ) {
    throw new Error("จำนวนสินค้าต้องเป็นจำนวนเต็มอย่างน้อย 1 ชิ้น");
  }

  // ตรวจสอบส่วนลด
  const discountPercent = order.discountPercent ?? 0;

  if (
    !Number.isFinite(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    throw new Error("ส่วนลดต้องอยู่ระหว่าง 0 ถึง 100 เปอร์เซ็นต์");
  }

  // ตรวจสอบวิธีชำระเงิน
  const validPayments: PaymentType[] = [
    "CASH",
    "PROMPTPAY",
    "CREDIT_CARD"
  ];

  if (!validPayments.includes(order.paymentType)) {
    throw new Error("ไม่พบประเภทการชำระเงินที่ถูกต้อง");
  }

  // คำนวณยอดรวมสินค้า
  const subtotal = Number(
    (order.price * order.quantity).toFixed(2)
  );

  // คำนวณส่วนลด
  const discountAmount = Number(
    (subtotal * discountPercent / 100).toFixed(2)
  );

  // ยอดหลังหักส่วนลด
  const taxableAmount = Number(
    (subtotal - discountAmount).toFixed(2)
  );

  // คำนวณ VAT 7%
  const vatAmount = Number(
    (taxableAmount * 0.07).toFixed(2)
  );

  // คำนวณยอดสุทธิ
  const grandTotal = Number(
    (taxableAmount + vatAmount).toFixed(2)
  );

  // ส่งค่ากลับ
  return {
    orderId: order.orderId,
    subtotal,
    discountAmount,
    vatAmount,
    grandTotal
  };
}

const result = calculateOrder({
  orderId: "ORD001",
  price: 1000,
  quantity: 2,
  discountPercent: 10,
  paymentType: "PROMPTPAY"
});

console.log(result);