export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  introduction: {
    headline: string;
    subheading: string;
    cta: string;
  };
  what_software_does: {
    title: string;
    description: string;
  };
  stats: Array<{
    icon: React.ReactNode;
    value: string;
    label: string;
  }>;
  problems_it_solves: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    solution: string;
  }>;
  key_features: Array<{
    icon: React.ReactNode;
    feature_name: string;
    description: string;
    benefits: string[];
  }>;
  why_its_the_best: {
    title: string;
    comparison_table: {
      headers: string[];
      rows: Array<{
        feature: string;
        [key: string]: string | boolean;
      }>;
    };
    usps: string[];
  };
  pricing_value: {
    title: string;
    value_proposition: string;
    pricing_tiers: Array<{
      name: string;
      description: string;
      price: number;
      popular?: boolean;
      features: string[];
    }>;
  };
  faq: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  final_cta: {
    conclusion: string;
    cta_button: string;
  };
  created_at?: string;
  updated_at?: string;
}

export * from "./config";
