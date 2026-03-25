export interface User {
  uuid: string;
  name: string;
  email: string;
}

export interface Plan {
  uuid: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: number;
  is_active: boolean;
  features: {
    download: boolean;
    hd_streaming: boolean;
    access_content: boolean;
    priority_support: boolean;
  };
}

export interface Subscription {
  uuid: string;
  user_id: string;
  plan_id: string;
  status: "ACTIVE" | "FAILED" | "EXPIRED" | "PENDING";
  start_date: string | null;
  end_date: string | null;
  plan: Plan;
}

export interface DashboardResponse {
  data: {
    user: User;
    subscriptions: Subscription;
  };
}