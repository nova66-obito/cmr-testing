import { useEffect, useMemo, useState } from "react";
import { Phone, Mic, MicOff, X } from "lucide-react";



export default function MakeACall({ isOpen, onClose, lead = null, onSubmit }) {
  
  const SIZES = {
    modalMaxWidth:
      "max-w-md sm:max-w-lg lg:max-w-2xl", // modal responsive width
    dialBtn: "w-16 h-16 sm:w-20 sm:h-20", // green call button (dial screen)
    iconDial: "w-7 h-7 sm:w-8 sm:h-8",
    actionBtn: "w-14 h-14 sm:w-16 sm:h-16", // mute/end buttons
    actionIcon: "w-5 h-5 sm:w-6 sm:h-6",
    timerText: "text-4xl sm:text-5xl",
  };
  // ---------------------------

  const [step, setStep] = useState("dial"); // "dial" | "calling" | "ended"
  const [phoneInput, setPhoneInput] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  // timer
  const [seconds, setSeconds] = useState(0);
  const formattedTime = useMemo(() => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [seconds]);

  // after-call form state
  const [result, setResult] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");

  // reset when opening
  useEffect(() => {
    if (isOpen) {
      setStep("dial");
      setSeconds(0);
      setIsMuted(false);
      setResult("");
      setNotes("");
      setFollowUpDate("");
      setFollowUpTime("");
      setPhoneInput(lead?.phone || "");
    }
  }, [isOpen, lead]);

  // timer runs only on "calling"
  useEffect(() => {
    if (step !== "calling") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [step]);

  if (!isOpen) return null;

  const displayPhone = lead?.phone || phoneInput || "";
  const displayName = lead?.leadName || null;

  const handleStartCall = () => {
    if (!displayPhone.trim()) return;
    setStep("calling");
    setSeconds(0);
  };

  const handleEndCall = () => {
    setStep("ended");
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const now = new Date();
    const newCall = {
      id: crypto.randomUUID(),
      leadName: displayName || "Quick Call",
      phone: displayPhone,
      duration: formattedTime,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: "Today",
      result: result || "Unknown",
      type: "outbound",
      executive: "You",
      notes,
      followUp: followUpDate
        ? { date: followUpDate, time: followUpTime || "" }
        : null,
    };

    onSubmit?.(newCall);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 p-3 sm:p-4 flex items-center justify-center">
      {/* ✅ Responsive modal + scrollable on small devices */}
      <div
        className={[
          "w-full bg-white rounded-2xl shadow-xl overflow-hidden",
          SIZES.modalMaxWidth,
          "max-h-[90vh] sm:max-h-[85vh] flex flex-col",
        ].join(" ")}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Call
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* ✅ Body scroll for small screens */}
        <div className="flex-1 overflow-y-auto">
          {/* STEP 1: DIAL */}
          {step === "dial" && (
            <div className="p-4 sm:p-8">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                value={displayPhone}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full rounded-full border-2 border-gray-300 px-4 py-3 text-sm sm:text-base text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />

              <div className="mt-8 sm:mt-10 flex flex-col items-center gap-6 sm:gap-8">
                <button
                  onClick={handleStartCall}
                  className={`${SIZES.dialBtn} rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center shadow-md transition`}
                >
                  <Phone className={`${SIZES.iconDial} text-white`} />
                </button>

                <button
                  onClick={onClose}
                  className="w-full rounded-full border border-gray-200 bg-white py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CALLING */}
          {step === "calling" && (
            <div className="p-4 sm:p-10 text-center">
              <div className="text-left text-xs sm:text-sm font-semibold text-gray-900 mb-6 sm:mb-8">
                Call
              </div>

              <div className="space-y-1 sm:space-y-2">
                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                  {displayName || "Quick Call"}
                </p>
                <p className="text-sm sm:text-base text-gray-500">
                  {displayPhone}
                </p>
              </div>

              <div className={`mt-8 sm:mt-10 font-medium text-gray-900 ${SIZES.timerText}`}>
                {formattedTime}
              </div>

              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4 sm:gap-6">
                {/* Mute */}
                <button
                  onClick={() => setIsMuted((m) => !m)}
                  className={`${SIZES.actionBtn} rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition`}
                >
                  {isMuted ? (
                    <MicOff className={`${SIZES.actionIcon} text-gray-900`} />
                  ) : (
                    <Mic className={`${SIZES.actionIcon} text-gray-900`} />
                  )}
                </button>

                {/* End call */}
                <button
                  onClick={handleEndCall}
                  className={`${SIZES.actionBtn} rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-md transition`}
                >
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 rotate-[135deg] text-white" />
                </button>
              </div>

              <button
                onClick={handleEndCall}
                className="mt-8 sm:mt-10 w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 sm:py-3 text-sm sm:text-base text-gray-500 font-medium"
              >
                Cancel
              </button>
            </div>
          )}

          {/* STEP 3: ENDED + FORM */}
          {step === "ended" && (
            <form onSubmit={handleSubmitForm} className="p-4 sm:p-6">
              <div className="text-center space-y-1">
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {displayName || "Quick Call"}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {displayPhone}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Call ended - {formattedTime}
                </p>
              </div>

              <hr className="my-4 sm:my-5" />

              {/* Call Result */}
              <label className="block text-xs font-semibold text-gray-900 mb-1">
                Call Result
              </label>
              <select
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="w-full h-10 text-sm rounded-lg border border-gray-200 bg-gray-50 px-3 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
              >
                <option value="">Select result</option>
                <option>Interested</option>
                <option>Call Back</option>
                <option>Not Picked</option>
                <option>Follow Up</option>
                <option>Not Interested</option>
              </select>

              {/* Notes */}
              <label className="block text-xs font-semibold text-gray-900 mt-3 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add call notes..."
                className="w-full text-sm rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
              />

              {/* Follow up */}
              <label className="block text-xs font-semibold text-gray-900 mt-3 mb-1">
                Schedule Follow-up (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full h-10 text-sm rounded-lg border border-gray-200 bg-gray-50 px-3 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                />
                <input
                  type="time"
                  value={followUpTime}
                  onChange={(e) => setFollowUpTime(e.target.value)}
                  className="w-full h-10 text-sm rounded-lg border border-gray-200 bg-gray-50 px-3 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                />
              </div>

              {/* Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-10 text-sm rounded-full border border-gray-200 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 text-sm rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Save &amp; Close
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
