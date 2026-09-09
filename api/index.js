const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzrfyw9EOF_P9IcWbH2awzuRzeV7Vcat2bbVCi1rI0-SvepYnj0SQaXlzGiUA_tFNA/exec";

export default async function handler(req, res) {
  try {

    // =========================
    // GET
    // =========================
    if (req.method === "GET") {

      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(req.query || {})) {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      }

      const url =
        params.toString()
          ? `${GAS_URL}?${params.toString()}`
          : GAS_URL;

      const response = await fetch(url);

      const text = await response.text();

      res
        .status(response.status)
        .setHeader("Content-Type", "application/json")
        .send(text);

      return;
    }


    // =========================
    // POST
    // =========================
    if (req.method === "POST") {

      let body = req.body;

      if (typeof body !== "string") {
        body = JSON.stringify(body);
      }

      const response = await fetch(GAS_URL, {
        method: "POST",

        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },

        body: body
      });

      const text = await response.text();

      res
        .status(response.status)
        .setHeader("Content-Type", "application/json")
        .send(text);

      return;
    }


    // =========================
    // METHOD LAIN
    // =========================
    res.status(405).json({
      success: false,
      message: "Method tidak diizinkan."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server."
    });

  }
}
