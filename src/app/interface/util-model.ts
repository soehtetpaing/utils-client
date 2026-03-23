interface ApiTokenResult {
  token: string;
  expireAt: string;
}

interface VerifyResult {
  status: number;
  message: string;
}

interface SubtleImage {
  id: number;
  name: string;
  path: string;
}
