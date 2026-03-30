"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

/* ─── Configuration ─────────────────────────────────────────────────────────── */

const quizSteps = [
  { id: "foundation", title: "Project Basics", fields: ["service"] },
  { id: "scope", title: "Scope & Timing", fields: ["budget", "timeline"] },
  { id: "contact", title: "Final Details", fields: ["name", "email"] },
];

const serviceOptions = [
  { value: "brand", label: "Brand Identity" },
  { value: "campaigns", label: "Campaign Systems" },
  { value: "content", label: "Content Strategy" },
  { value: "growth", label: "Growth Marketing" },
];

/* ─── Main Component ────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      service: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
    },
    mode: "onTouched",
  });

  const watchAll = useWatch({ control });
  const activeStep = quizSteps[stepIndex];

  const goNext = async () => {
    const valid = await trigger(activeStep.fields as any);
    if (valid) setStepIndex((p) => Math.min(p + 1, quizSteps.length - 1));
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col pt-30 items-center justify-center p-6 selection:bg-orange-100">
      {/* 1. Page Title (External) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-beni text-7xl md:text-9xl font-bold  text-emerald-900 leading-[0.8]">
          Start a <span className="text-orange-500 ">Dialogue.</span>
        </h1>
        <p className="font-clash text-sm md:text-base text-emerald-900 mt-6 uppercase tracking-[0.2em]">
          Tell us about your vision in three steps.
        </p>
      </motion.div>

      {/* 2. Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl bg-white rounded-[32px] shadow-sm border border-emerald-900/5 overflow-hidden"
      >
        {/* Integrated Progress Bar */}
        <div className="flex h-1.5 w-full bg-emerald-900/5">
          {quizSteps.map((_, i) => (
            <div
              key={i}
              className={`h-full transition-all duration-700 ease-in-out ${
                i <= stepIndex ? "bg-orange-500" : "bg-transparent"
              }`}
              style={{ width: `${100 / quizSteps.length}%` }}
            />
          ))}
        </div>

        <div className="p-8 md:p-16">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Header */}
                <header className="mb-12">
                  <span className="font-clash text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-2 block">
                    Phase 0{stepIndex + 1}
                  </span>
                  <h2 className="font-beni text-5xl md:text-6xl font-bold   text-emerald-900 leading-none">
                    {activeStep.title}.
                  </h2>
                </header>

                {/* Form Fields */}
                <form
                  onSubmit={handleSubmit((d) => setIsComplete(true))}
                  className="space-y-8"
                >
                  {stepIndex === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceOptions.map((opt) => (
                        <ChoiceCard
                          key={opt.value}
                          label={opt.label}
                          value={opt.value}
                          selected={watchAll.service === opt.value}
                          register={register("service", { required: true })}
                        />
                      ))}
                    </div>
                  )}

                  {stepIndex === 1 && (
                    <div className="space-y-10">
                      <div>
                        <p className="font-clash text-xs font-bold uppercase tracking-widest text-emerald-900/30 mb-4">
                          Investment
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "Under $5k",
                            "$5k - $15k",
                            "$15k - $30k",
                            "$30k+",
                          ].map((b) => (
                            <ChoiceCard
                              key={b}
                              label={b}
                              value={b}
                              selected={watchAll.budget === b}
                              register={register("budget", { required: true })}
                              small
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {stepIndex === 2 && (
                    <div className="space-y-2">
                      <ModernInput
                        placeholder="Full Name"
                        {...register("name", { required: true })}
                      />
                      <ModernInput
                        placeholder="Work Email"
                        type="email"
                        {...register("email", { required: true })}
                      />
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <footer className="pt-12 flex items-center justify-between border-t border-emerald-900/5 mt-12">
                    <button
                      type="button"
                      onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
                      className={`font-clash text-xs font-bold flex items-center gap-2 hover:text-orange-500 transition-colors uppercase tracking-widest ${stepIndex === 0 ? "opacity-0 pointer-events-none" : ""}`}
                    >
                      <ArrowLeft size={14} /> Back
                    </button>

                    <button
                      type="button"
                      onClick={
                        stepIndex === quizSteps.length - 1
                          ? handleSubmit((d) => setIsComplete(true))
                          : goNext
                      }
                      className="bg-emerald-900 text-white px-8 py-4 rounded-full font-clash text-sm font-bold hover:bg-orange-500 transition-all active:scale-95 flex items-center gap-3"
                    >
                      {stepIndex === quizSteps.length - 1
                        ? "Send Brief"
                        : "Next Phase"}
                      <ArrowRight size={16} />
                    </button>
                  </footer>
                </form>
              </motion.div>
            ) : (
              <SuccessState
                onReset={() => {
                  setStepIndex(0);
                  setIsComplete(false);
                  reset();
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── UI Helpers ─────────────────────────────────────────────────────────── */

function ChoiceCard({ label, value, selected, register, small }: any) {
  return (
    <label
      className={`cursor-pointer flex items-center px-6 rounded-2xl border-2 transition-all duration-500 ${
        selected
          ? "border-orange-500 bg-orange-50/30"
          : "border-emerald-900/5 hover:border-emerald-900/10"
      } ${small ? "py-4" : "py-6"}`}
    >
      <input type="radio" value={value} {...register} className="sr-only" />
      <span
        className={`font-clash font-bold transition-colors ${small ? "text-sm" : "text-lg"} ${selected ? "text-orange-600" : "text-emerald-900/40"}`}
      >
        {label}
      </span>
      {selected && (
        <Check className="ml-auto text-orange-500" size={18} strokeWidth={3} />
      )}
    </label>
  );
}

const ModernInput = React.forwardRef(
  ({ placeholder, ...props }: any, ref: any) => (
    <div className="relative w-full group">
      <input
        ref={ref}
        {...props}
        placeholder={placeholder}
        className="peer w-full bg-transparent border-b border-emerald-900/10 py-6 font-beni text-3xl font-bold outline-none focus:border-orange-500 transition-all placeholder:text-emerald-900/10"
      />
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-orange-500 transition-all duration-700 peer-focus:w-full" />
    </div>
  ),
);
ModernInput.displayName = "ModernInput";

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-12">
      <h2 className="font-beni text-7xl font-bold italic mb-4 text-emerald-900">
        Brief Sent.
      </h2>
      <p className="font-clash text-emerald-900/40 mb-10 text-sm uppercase tracking-widest">
        We'll review and reach out shortly.
      </p>
      <button
        onClick={onReset}
        className="font-clash text-xs font-bold uppercase tracking-widest text-orange-500 border-b border-orange-500 pb-1"
      >
        Start New Project
      </button>
    </div>
  );
}
