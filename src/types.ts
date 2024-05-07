export type Picture = {
  large: string;
};

export interface User {
  name: string;
  emailId: string;
  picture: Picture;
  phone: string;
  cell: string;
  isActive: boolean;
  id: string;
}
