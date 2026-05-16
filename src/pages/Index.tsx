import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Activity, AlertCircle } from "lucide-react";

type FormState = {
  Age: string;
  Gender: string;
  Total_Bilirubin: string;
  Alkaline_Phosphotase: string;
  Alamine_Aminotransferase: string;
  Aspartate_Aminotransferase: string;
  Total_Protiens: string;
  Albumin: string;
  Albumin_and_Globulin_Ratio: string;
};

const initialState: FormState = {
  Age: "",
  Gender: "",
  Total_Bilirubin: "",
  Alkaline_Phosphotase: "",
  Alamine_Aminotransferase: "",
  Aspartate_Aminotransferase: "",
  Total_Protiens: "",
  Albumin: "",
  Albumin_and_Globulin_Ratio: "",
};

const numericFields: { key: keyof Omit<FormState, "Gender">; label: string; step?: string }[] = [
  { key: "Age", label: "Age", step: "1" },
  { key: "Total_Bilirubin", label: "Total Bilirubin", step: "0.01" },
  { key: "Alkaline_Phosphotase", label: "Alkaline Phosphotase", step: "1" },
  { key: "Alamine_Aminotransferase", label: "Alamine Aminotransferase", step: "1" },
  { key: "Aspartate_Aminotransferase", label: "Aspartate Aminotransferase", step: "1" },
  { key: "Total_Protiens", label: "Total Proteins", step: "0.01" },
  { key: "Albumin", label: "Albumin", step: "0.01" },
  { key: "Albumin_and_Globulin_Ratio", label: "Albumin and Globulin Ratio", step: "0.01" },
];

const Index = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Validate
    if (!form.Gender) {
      setError("Please select a gender.");
      return;
    }
    for (const f of numericFields) {
      if (form[f.key] === "" || isNaN(Number(form[f.key]))) {
        setError(`Please enter a valid number for ${f.label}.`);
        return;
      }
    }

    const payload = {
      Age: Number(form.Age),
      Gender: form.Gender,
      Total_Bilirubin: Number(form.Total_Bilirubin),
      Alkaline_Phosphotase: Number(form.Alkaline_Phosphotase),
      Alamine_Aminotransferase: Number(form.Alamine_Aminotransferase),
      Aspartate_Aminotransferase: Number(form.Aspartate_Aminotransferase),
      Total_Protiens: Number(form.Total_Protiens),
      Albumin: Number(form.Albumin),
      Albumin_and_Globulin_Ratio: Number(form.Albumin_and_Globulin_Ratio),
    };

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setResult(String(data.result ?? "No result field returned."));
    } catch (err) {
      setError(
        err instanceof Error
          ? `Failed to reach prediction API: ${err.message}`
          : "Failed to reach prediction API."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/40 to-secondary flex items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-3xl shadow-xl border-border/60">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Liver Disease Prediction</CardTitle>
          <CardDescription>
            Enter patient lab results to get an instant prediction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Age">Age</Label>
              <Input
                id="Age"
                type="number"
                min="0"
                value={form.Age}
                onChange={(e) => update("Age", e.target.value)}
                placeholder="e.g. 45"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Gender">Gender</Label>
              <Select value={form.Gender} onValueChange={(v) => update("Gender", v)}>
                <SelectTrigger id="Gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {numericFields
              .filter((f) => f.key !== "Age")
              .map((f) => (
                <div key={f.key} className="space-y-2">
                  <Label htmlFor={f.key}>{f.label}</Label>
                  <Input
                    id={f.key}
                    type="number"
                    step={f.step}
                    value={form[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              ))}

            <div className="sm:col-span-2 mt-2">
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  "Predict"
                )}
              </Button>
            </div>
          </form>

          {(result || error) && (
            <div className="mt-6">
              {error && (
                <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                  <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {result && (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 text-center">
                  <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1">
                    Prediction Result
                  </p>
                  <p className="text-xl font-semibold text-primary">{result}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default Index;
