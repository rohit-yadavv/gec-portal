export function checkAdminEligibility(email: string): boolean {
  if (email.endsWith("@gmail.com")) {
      return true;
  } else {
      return false;
  }
}

checkAdminEligibility("rk4740779@gmail.com")