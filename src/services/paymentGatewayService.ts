import { PaymentGateway } from "@/types/paymentGateway";

const API_BASE_URL = "http://13.233.225.7:8000";

const getAuthToken = () => {
  return localStorage.getItem("token") || "";
};

export const createPaymentGateway = async (paymentData: {
  publicName: string;
  privateName: string;
  key: string;
}): Promise<PaymentGateway> => {
  const response = await fetch(`${API_BASE_URL}/api/createPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create payment gateway");
  }

  return response.json();
};

export const updatePaymentGateway = async (
  id: string,
  paymentData: { publicName: string; privateName: string; key: string }
): Promise<PaymentGateway> => {
  const response = await fetch(`${API_BASE_URL}/api/updatePayment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update payment gateway");
  }

  return response.json();
};

export const getAllPaymentGateways = async (): Promise<PaymentGateway[]> => {
  const response = await fetch(`${API_BASE_URL}/api/AllPayment`, {
    method: "GET",
    headers: {
      Authorization: getAuthToken(),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch payment gateways");
  }

  return response.json();
};
