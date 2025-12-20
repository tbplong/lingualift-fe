export type UserUpdateREQ = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  highSchool?: string;
  socialMedia?: {
    facebookUrl?: string;
    facebookName?: string;
  };
};
