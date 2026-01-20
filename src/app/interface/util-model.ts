interface ApiTokenResult {
  token: string;
  expireAt: string;
}

interface VerifyResult {
  status: number;
  message: string;
}