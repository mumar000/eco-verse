"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { Check, ArrowRight, ArrowLeft, X, Sparkles, Send } from "lucide-react";

const quizSteps = [
  {
    id: "foundation",
    eyebrow: "01",
    title: "Project Basics",
    description: "Tell us what you're building and where you're at.",
    fields: ["service", "stage"],
  },
  {
    id: "scope",
    eyebrow: "02",
    title: "Scope & Timing",
    description: "Define the boundaries and the deadline.",
    fields: ["budget", "timeline", "goals"],
  },
  {
    id: "contact",
    eyebrow: "03",
    title: "Contact Details",
    description: "Just the essentials so we can reach out.",
    fields: ["name", "email", "company"],
  },
];

const serviceOptions = [
  { value: "brand", label: "Brand Identity", index: "A" },
  { value: "website", label: "Website Design", index: "B" },
  { value: "content", label: "Content Strategy", index: "C" },
  { value: "growth", label: "Growth Marketing", index: "D" },
];

const stageOptions = [
  { value: "exploring", label: "Just Exploring", index: "A" },
  { value: "ready", label: "Ready to Start", index: "B" },
  { value: "active", label: "Already in Motion", index: "C" },
  { value: "rescue", label: "Need a Reset", index: "D" },
];

const budgetOptions = [
  { value: "under-2k", label: "Under $2k" },
  { value: "2k-5k", label: "$2k - $5k" },
  { value: "5k-10k", label: "$5k - $10k" },
  { value: "10k-plus", label: "$10k+" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP", index: "A" },
  { value: "2-weeks", label: "2-4 Weeks", index: "B" },
  { value: "1-2-months", label: "1-2 Months", index: "C" },
  { value: "flexible", label: "Flexible", index: "D" },
];

const goalOptions = [
  { value: "launch", label: "Launch Fast", index: "A" },
  { value: "clarity", label: "Sharpen Positioning", index: "B" },
  { value: "leads", label: "Generate Leads", index: "C" },
  { value: "content", label: "Improve Content", index: "D" },
];

const defaultValues = {
  service: "",
  stage: "",
  budget: "",
  timeline: "",
  goals: [],
  name: "",
  email: "",
  company: "",
};

function ChoiceCard({ selected, label, index, type = "radio" }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex min-h-[72px] cursor-pointer items-center justify-between rounded-2xl border-2 p-3.5 transition-all duration-300 sm:min-h-[76px] sm:p-4 ${
        selected
          ? "border-orange-500 bg-orange-50/50 shadow-[0_8px_20px_rgba(249,115,22,0.1)]"
          : "border-emerald-900/5 bg-white hover:border-orange-500/30 hover:bg-orange-50/20"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {index && (
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg font-clash text-[11px] font-bold transition-colors sm:h-8 sm:w-8 sm:text-xs ${
            selected ? "bg-orange-500 text-white" : "bg-emerald-900/5 text-emerald-900/40 group-hover:bg-orange-500/10 group-hover:text-orange-500"
          }`}>
            {index}
          </span>
        )}
        <span className={`font-clash text-[13px] font-semibold leading-5 transition-colors sm:text-sm ${
          selected ? "text-emerald-900" : "text-emerald-900/70 group-hover:text-emerald-900"
        }`}>
          {label}
        </span>
      </div>
      <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
        selected ? "border-orange-500 bg-orange-500" : "border-emerald-900/10 bg-transparent"
      }`}>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={type === "radio" ? "h-2 w-2 rounded-full bg-white" : ""}
          >
            {type === "checkbox" && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function FieldLabel({ children, optional = false }) {
  return (
    <label className="mb-3 block font-clash text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/40 sm:mb-4">
      {children}
      {optional && <span className="ml-2 font-medium lowercase italic text-emerald-900/20">(Optional)</span>}
    </label>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function QuizModal({
  open,
  onClose,
  onSubmit,
  title = "Project Discovery",
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  const selectedService = useWatch({ control, name: "service" });
  const selectedStage = useWatch({ control, name: "stage" });
  const selectedBudget = useWatch({ control, name: "budget" });
  const selectedTimeline = useWatch({ control, name: "timeline" });
  const selectedGoals = useWatch({ control, name: "goals" }) || [];

  const activeStep = quizSteps[stepIndex];

  const handleClose = () => {
    setStepIndex(0);
    setIsComplete(false);
    setSubmitError("");
    reset(defaultValues);
    onClose?.();
  };

  const goToNextStep = async () => {
    const isStepValid = await trigger(activeStep.fields);
    if (isStepValid) {
      setStepIndex((prev) => Math.min(prev + 1, quizSteps.length - 1));
    }
  };

  const onFormSubmit = async (values) => {
    try {
      await onSubmit?.(values);
      setIsComplete(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative grid max-h-[92vh] w-full max-w-[94vw] overflow-hidden rounded-[28px] border border-white/10 bg-[#FFF8F6] shadow-2xl md:max-w-3xl md:grid-cols-1 lg:max-w-5xl lg:grid-cols-[0.84fr_1.16fr] 2xl:max-w-[1240px]"
          >
            {/* Sidebar */}
            <div className="relative flex flex-col justify-between bg-emerald-900 px-5 py-6 text-white sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-9 lg:py-9 2xl:px-10 2xl:py-10">
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 lg:mb-8 2xl:mb-10">
                  <Sparkles className="h-5 w-5" />
                </div>
                
                <h2 className="mb-2 font-beni text-[34px] font-bold uppercase leading-none tracking-tight sm:text-[40px] md:text-[44px] lg:text-[46px] 2xl:text-[52px]">
                  {title}
                </h2>
                <p className="max-w-md font-clash text-[13px] leading-5 text-emerald-100/60 sm:text-sm">
                  {isComplete ? "Submission successful." : activeStep.description}
                </p>

                <nav className="mt-8 space-y-4 md:mt-9 md:space-y-5 lg:mt-10 lg:space-y-6 2xl:mt-12">
                  {quizSteps.map((step, idx) => {
                    const isActive = stepIndex === idx;
                    const isDone = stepIndex > idx || isComplete;
                    return (
                      <div key={step.id} className="group relative flex items-center gap-3 sm:gap-4">
                        <div className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-500 sm:h-10 sm:w-10 ${
                          isActive ? "border-orange-500 bg-orange-500 text-white" : 
                          isDone ? "border-emerald-500 bg-emerald-500 text-white" : "border-white/10 bg-transparent text-white/20"
                        }`}>
                          {isDone ? <Check className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} /> : <span className="font-clash text-[11px] font-bold sm:text-xs">{step.eyebrow}</span>}
                          {idx < quizSteps.length - 1 && (
                            <div className={`absolute top-9 h-5 w-0.5 transition-colors duration-500 sm:top-10 sm:h-6 lg:h-7 ${isDone ? "bg-emerald-500" : "bg-white/10"}`} />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-clash text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? "text-orange-400" : "text-white/20"}`}>
                            Step {step.eyebrow}
                          </span>
                          <span className={`font-clash text-[13px] font-semibold transition-colors sm:text-sm ${isActive ? "text-white" : "text-white/40"}`}>
                            {step.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div className="relative z-10 mt-8 lg:mt-10">
                <div className="flex items-center justify-between font-clash text-[10px] font-bold uppercase tracking-widest text-emerald-100/30">
                  <span>Progress</span>
                  <span>{isComplete ? 100 : Math.round(((stepIndex + 1) / quizSteps.length) * 100)}%</span>
                </div>
                <div className="mt-3 h-1 w-full rounded-full bg-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${isComplete ? 100 : ((stepIndex + 1) / quizSteps.length) * 100}%` }}
                    className="h-full rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                  />
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute -right-24 top-24 h-48 w-48 rounded-full bg-emerald-400/5 blur-3xl" />
            </div>

            {/* Main Content */}
            <div className="relative flex min-h-0 flex-col p-5 sm:p-6 md:p-8 lg:p-9 2xl:p-10">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/5 text-emerald-900/30 transition-all hover:border-emerald-900/10 hover:bg-emerald-900/5 hover:text-emerald-900 sm:right-5 sm:top-5 sm:h-10 sm:w-10 lg:right-6 lg:top-6"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex-1 overflow-y-auto pr-1">
                {isComplete ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center py-8 text-center sm:py-10"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[28px] bg-emerald-100 text-emerald-600 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-[32px]">
                      <Send className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="font-beni text-[40px] font-bold uppercase tracking-tight text-emerald-900 sm:text-5xl">
                      Got it!
                    </h3>
                    <p className="mt-3 max-w-sm font-clash text-base font-medium leading-6 text-emerald-900/50 sm:mt-4 sm:text-lg">
                      We&apos;ve received your project details. Our team will review everything and get back to you soon.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 rounded-2xl bg-emerald-900 px-8 py-3.5 font-clash text-sm font-bold text-white transition-all hover:scale-105 hover:bg-emerald-800 active:scale-95 sm:mt-10 sm:px-10 sm:py-4"
                    >
                      Return to Site
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onFormSubmit)} className="flex h-full flex-col">
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={stepIndex}
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="space-y-6 md:space-y-7 lg:space-y-8"
                        >
                          {stepIndex === 0 && (
                            <>
                              <motion.div variants={itemVariants}>
                                <FieldLabel>Project Type</FieldLabel>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {serviceOptions.map((opt) => (
                                    <label key={opt.value} className="cursor-pointer">
                                      <input type="radio" className="sr-only" value={opt.value} {...register("service", { required: "Please select a service" })} />
                                      <ChoiceCard selected={selectedService === opt.value} label={opt.label} index={opt.index} />
                                    </label>
                                  ))}
                                </div>
                                {errors.service && <p className="mt-2 font-clash text-xs font-semibold text-orange-600">{errors.service.message}</p>}
                              </motion.div>

                              <motion.div variants={itemVariants}>
                                <FieldLabel>Current Stage</FieldLabel>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {stageOptions.map((opt) => (
                                    <label key={opt.value} className="cursor-pointer">
                                      <input type="radio" className="sr-only" value={opt.value} {...register("stage", { required: "Please select a stage" })} />
                                      <ChoiceCard selected={selectedStage === opt.value} label={opt.label} index={opt.index} />
                                    </label>
                                  ))}
                                </div>
                                {errors.stage && <p className="mt-2 font-clash text-xs font-semibold text-orange-600">{errors.stage.message}</p>}
                              </motion.div>
                            </>
                          )}

                          {stepIndex === 1 && (
                            <>
                              <motion.div variants={itemVariants}>
                                <FieldLabel>Budget Range</FieldLabel>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                  {budgetOptions.map((opt) => (
                                    <label key={opt.value} className="cursor-pointer">
                                      <input type="radio" className="sr-only" value={opt.value} {...register("budget", { required: "Select a budget" })} />
                                      <div className={`flex min-h-[72px] flex-col items-center justify-center rounded-2xl border-2 px-2 py-4 text-center transition-all duration-300 sm:min-h-[84px] sm:py-5 ${
                                        selectedBudget === opt.value 
                                        ? "border-orange-500 bg-orange-50/50 text-emerald-900" 
                                        : "border-emerald-900/5 bg-white text-emerald-900/40 hover:border-orange-500/20"
                                      }`}>
                                        <span className="font-clash text-[11px] font-bold leading-4 sm:text-xs">{opt.label}</span>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                                {errors.budget && <p className="mt-2 font-clash text-xs font-semibold text-orange-600">{errors.budget.message}</p>}
                              </motion.div>

                              <motion.div variants={itemVariants}>
                                <FieldLabel>Timeline</FieldLabel>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {timelineOptions.map((opt) => (
                                    <label key={opt.value} className="cursor-pointer">
                                      <input type="radio" className="sr-only" value={opt.value} {...register("timeline", { required: "Select a timeline" })} />
                                      <ChoiceCard selected={selectedTimeline === opt.value} label={opt.label} index={opt.index} />
                                    </label>
                                  ))}
                                </div>
                                {errors.timeline && <p className="mt-2 font-clash text-xs font-semibold text-orange-600">{errors.timeline.message}</p>}
                              </motion.div>

                              <motion.div variants={itemVariants}>
                                <FieldLabel>Main Objectives</FieldLabel>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {goalOptions.map((opt) => (
                                    <label key={opt.value} className="cursor-pointer">
                                      <input type="checkbox" className="sr-only" value={opt.value} {...register("goals", { validate: v => v.length > 0 || "Select at least one" })} />
                                      <ChoiceCard selected={selectedGoals.includes(opt.value)} label={opt.label} index={opt.index} type="checkbox" />
                                    </label>
                                  ))}
                                </div>
                                {errors.goals && <p className="mt-2 font-clash text-xs font-semibold text-orange-600">{errors.goals.message}</p>}
                              </motion.div>
                            </>
                          )}

                          {stepIndex === 2 && (
                            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                              <motion.div variants={itemVariants} className="sm:col-span-2">
                                <FieldLabel>Your Name</FieldLabel>
                                <input
                                  type="text"
                                  placeholder="John Doe"
                                  className="w-full rounded-2xl border-2 border-emerald-900/5 bg-white px-4 py-3.5 font-clash text-sm font-semibold text-emerald-900 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 sm:px-5 sm:py-4"
                                  {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && <p className="mt-2 font-clash text-xs font-semibold text-orange-600">{errors.name.message}</p>}
                              </motion.div>
                              <motion.div variants={itemVariants}>
                                <FieldLabel>Work Email</FieldLabel>
                                <input
                                  type="email"
                                  placeholder="john@example.com"
                                  className="w-full rounded-2xl border-2 border-emerald-900/5 bg-white px-4 py-3.5 font-clash text-sm font-semibold text-emerald-900 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 sm:px-5 sm:py-4"
                                  {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                                />
                                {errors.email && <p className="mt-2 font-clash text-xs font-semibold text-orange-600">{errors.email.message || "Enter a valid email"}</p>}
                              </motion.div>
                              <motion.div variants={itemVariants}>
                                <FieldLabel optional>Company</FieldLabel>
                                <input
                                  type="text"
                                  placeholder="Company Name"
                                  className="w-full rounded-2xl border-2 border-emerald-900/5 bg-white px-4 py-3.5 font-clash text-sm font-semibold text-emerald-900 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 sm:px-5 sm:py-4"
                                  {...register("company")}
                                />
                              </motion.div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {submitError && (
                      <p className="mt-4 font-clash text-xs font-semibold text-orange-600">{submitError}</p>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-emerald-900/5 pt-5 lg:mt-8 lg:pt-6">
                      <button
                        type="button"
                        onClick={() => setStepIndex(s => Math.max(0, s - 1))}
                        className={`flex items-center gap-2 font-clash text-xs font-bold uppercase tracking-widest text-emerald-900/40 transition-colors hover:text-emerald-900 ${stepIndex === 0 ? "invisible" : ""}`}
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>

                      {stepIndex === quizSteps.length - 1 ? (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group flex items-center gap-3 rounded-2xl bg-orange-500 px-5 py-3.5 font-clash text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:bg-orange-600 active:scale-95 disabled:opacity-50 sm:px-6 sm:py-4"
                        >
                          {isSubmitting ? "Sending..." : "Send Request"}
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={goToNextStep}
                          className="group flex items-center gap-3 rounded-2xl bg-emerald-900 px-5 py-3.5 font-clash text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-all hover:scale-105 hover:bg-emerald-800 active:scale-95 sm:px-6 sm:py-4"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
