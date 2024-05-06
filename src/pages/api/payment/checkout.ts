import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const payment = {
    "amount": 2900,
    "ccy": 840,
    "merchantPaymInfo": {
      "reference": "84d0070ee4e44667b31371d8f8813947",
      "destination": "Lead Up plan purchasing",
      "basketOrder": [
        {
          "name": "Basic Plan",
          "qty": 1,
          "sum": 2900,
          "icon": "string",
          "unit": "pcs.",
          "code": "d21da1c47f3c45fca10a10c32518bdeb"
        }
      ]
    },
    "redirectUrl": "http://localhost:4321/",
    "validity": 3600
  };

  const res = await fetch(
    "https://api.monobank.ua/api/merchant/invoice/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token":
          "u_ZCpUjZQ2fv0n_zfdQgd-4GrJKThfdgg3gdD60dwlr4",
      },
      body: JSON.stringify(payment),
    }
  );
  const data = await res.json()

  console.log(data)
  return redirect(data.pageUrl)
};
