export interface FooterLink {
  id: number;
  text: string;
  URL?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface Footer {
  id: number;
  logo: {
    url: string;
  };
  description?: string;
  copyright?: string;
  internal_links?: FooterLink[];
  policy_links?: FooterLink[];
}
