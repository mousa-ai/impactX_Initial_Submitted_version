export type Pair = { en: string; ar: string };

const pair = (en: string, ar: string): Pair => ({ en, ar });

export const types: Record<string, Pair> = {
  personal_loan: pair("Personal loan", "قرض شخصي"),
  mortgage: pair("Mortgage", "رهن عقاري"),
  auto_loan: pair("Auto loan", "قرض سيارة"),
  business_loan: pair("Business loan", "قرض تجاري"),
  credit_card: pair("Credit card", "بطاقة ائتمان"),
};

export const typeDescriptions: Record<string, Pair> = {
  personal_loan: pair(
    "Unsecured personal credit for consolidation, expenses, or planned purchases.",
    "تمويل شخصي غير مضمون للتجميع أو المصاريف أو المشتريات المخطط لها.",
  ),
  mortgage: pair(
    "Home purchase or refinance with property-backed underwriting.",
    "شراء منزل أو إعادة تمويل بضمان العقار.",
  ),
  auto_loan: pair(
    "Vehicle financing with title and income verification.",
    "تمويل مركبة مع التحقق من الملكية والدخل.",
  ),
  business_loan: pair(
    "Working capital or expansion credit for registered entities.",
    "رأس مال عامل أو توسعة للكيانات المسجلة.",
  ),
  credit_card: pair(
    "Revolving consumer credit with identity and income checks.",
    "ائتمان استهلاكي دوار مع التحقق من الهوية والدخل.",
  ),
};

export const statuses: Record<string, Pair> = {
  draft: pair("Draft", "مسودة"),
  submitted: pair("Submitted", "مُقدَّم"),
  under_review: pair("Under review", "قيد المراجعة"),
  needs_resubmission: pair("Needs resubmission", "يحتاج إعادة رفع"),
  approved: pair("Approved", "مقبول"),
  rejected: pair("Rejected", "مرفوض"),
};

export const questions: Record<string, Pair> = {
  loan_amount: pair("Requested amount", "المبلغ المطلوب"),
  employment_status: pair("Employment status", "حالة التوظيف"),
  employment_duration_months: pair("Months at current role", "أشهر في الدور الحالي"),
  annual_income: pair("Annual income", "الدخل السنوي"),
  residency_status: pair("Residency status", "حالة الإقامة"),
  housing_status: pair("Housing", "السكن"),
  has_existing_debt: pair("Do you have existing installment debt?", "هل لديك أقساط قائمة؟"),
  down_payment_percent: pair("Down payment (%)", "الدفعة الأولى (%)"),
  property_type: pair("Property type", "نوع العقار"),
  vehicle_year: pair("Vehicle year", "سنة المركبة"),
  business_years: pair("Years in operation", "سنوات التشغيل"),
  business_entity: pair("Entity type", "نوع الكيان"),
  credit_purpose: pair("Primary use", "الاستخدام الأساسي"),
};

export const options: Record<string, Pair> = {
  employed: pair("Employed", "موظف"),
  "self-employed": pair("Self-employed", "عمل حر"),
  unemployed: pair("Unemployed", "عاطل"),
  retired: pair("Retired", "متقاعد"),
  citizen: pair("Citizen", "مواطن"),
  permanent_resident: pair("Permanent resident", "مقيم دائم"),
  visa: pair("Visa / work permit", "تأشيرة / تصريح عمل"),
  own: pair("Own", "ملك"),
  rent: pair("Rent", "إيجار"),
  single_family: pair("Single family", "منزل مستقل"),
  condo: pair("Condo", "شقة تمليك"),
  multi: pair("Multi-unit", "متعدد الوحدات"),
  sole: pair("Sole proprietor", "مؤسسة فردية"),
  llc: pair("LLC", "شركة ذات مسؤولية محدودة"),
  corp: pair("Corporation", "شركة مساهمة"),
  everyday: pair("Everyday spending", "إنفاق يومي"),
  travel: pair("Travel", "سفر"),
  build_credit: pair("Build credit", "بناء ائتمان"),
};

export const documents: Record<string, Pair> = {
  government_id: pair("Government ID", "هوية حكومية"),
  proof_of_address: pair("Proof of address", "إثبات عنوان"),
  proof_of_income: pair("Proof of income", "إثبات دخل"),
  bank_statements: pair("Bank statements", "كشف حساب"),
  tax_returns: pair("Tax returns", "الإقرار الضريبي"),
  employment_letter: pair("Employment letter", "خطاب عمل"),
  property_appraisal: pair("Property appraisal", "تقييم العقار"),
  title_deed: pair("Title deed", "صك الملكية"),
  vehicle_title: pair("Vehicle title", "استمارة المركبة"),
  business_registration: pair("Business registration", "سجل تجاري"),
  articles_of_incorporation: pair("Articles of incorporation", "عقد التأسيس"),
  void_check: pair("Voided check", "شيك ملغى"),
  credit_authorization: pair("Credit authorization", "تفويض ائتماني"),
};

export const validation: Record<string, Pair> = {
  success: pair("Validated", "تم التحقق"),
  error: pair("Failed", "فشل"),
  pending: pair("Checking", "جارٍ الفحص"),
  idle: pair("Ready", "جاهز"),
};

export const decisions: Record<string, Pair> = {
  approve: pair("Approve", "قبول"),
  review: pair("Keep in review", "إبقاء للمراجعة"),
  reject: pair("Reject", "رفض"),
  request_resubmission: pair("Request resubmission", "طلب إعادة رفع"),
};

export const aiActions: Record<string, Pair> = {
  approve: pair("approve", "قبول"),
  review: pair("review", "مراجعة"),
  reject: pair("reject", "رفض"),
};

export const severities: Record<string, Pair> = {
  critical: pair("Critical", "حرج"),
  high: pair("High", "مرتفع"),
  medium: pair("Medium", "متوسط"),
  low: pair("Low", "منخفض"),
};

export const flagCodes: Record<string, Pair> = {
  unreadable_title: pair("Unreadable title", "استمارة غير مقروءة"),
  income_mismatch: pair("Income mismatch", "عدم تطابق الدخل"),
  statement_pending: pair("Statement pending", "كشف الحساب قيد الفحص"),
  new_entity_geo: pair("Address mismatch", "عدم تطابق العنوان"),
  quality_failed: pair("Quality failed", "فشل الجودة"),
  validation_failed: pair("Validation failed", "فشل التحقق"),
  mime_not_allowed: pair("File type not allowed", "نوع الملف غير مسموح"),
  file_too_large: pair("File too large", "الملف كبير جداً"),
  file_too_thin: pair("File incomplete", "الملف غير مكتمل"),
  inconsistent_metadata: pair("Metadata mismatch", "عدم تطابق البيانات"),
};

export const questionHelpers: Record<string, Pair> = {
  loan_amount: pair("The amount you want to borrow.", "المبلغ الذي تريد اقتراضه."),
  employment_status: pair("Used to determine income documentation.", "يُستخدم لتحديد مستندات الدخل."),
  employment_duration_months: pair("How long you have been in your current position.", "منذ متى وأنت في منصبك الحالي."),
  annual_income: pair("Gross annual income before tax.", "الدخل السنوي الإجمالي قبل الضريبة."),
  down_payment_percent: pair("Percentage of purchase price paid upfront.", "نسبة سعر الشراء المدفوعة مقدماً."),
};

export const documentDescriptions: Record<string, Pair> = {
  government_id: pair("Passport or national ID, all corners visible.", "جواز سفر أو هوية وطنية، جميع الزوايا ظاهرة."),
  proof_of_address: pair("Utility bill or bank letter issued in the last 90 days.", "فاتورة خدمات أو خطاب بنك صادر خلال 90 يوماً."),
  proof_of_income: pair("Recent payslips or equivalent income evidence.", "قسائم راتب حديثة أو ما يعادلها."),
  bank_statements: pair("Last 90 days from the primary account.", "آخر 90 يوماً من الحساب الأساسي."),
  tax_returns: pair("Most recent personal or business tax filing.", "آخر إقرار ضريبي شخصي أو تجاري."),
  employment_letter: pair("Letter confirming role, tenure, and compensation.", "خطاب يؤكد الدور ومدة الخدمة والتعويض."),
  property_appraisal: pair("Independent valuation for the subject property.", "تقييم مستقل للعقار موضوع الطلب."),
  title_deed: pair("Current deed or purchase agreement.", "صك حالي أو اتفاقية شراء."),
  vehicle_title: pair("Title or bill of sale for the financed vehicle.", "استمارة أو فاتورة بيع للمركبة الممولة."),
  business_registration: pair("Certificate of registration or good standing.", "شهادة تسجيل أو حسن سيرة."),
  articles_of_incorporation: pair("Formation documents for LLC or corporation.", "وثائق التأسيس لشركة ذات مسؤولية محدودة أو مساهمة."),
  void_check: pair("For disbursement account verification.", "للتحقق من حساب الصرف."),
  credit_authorization: pair("Signed consent for a consumer credit pull.", "موافقة موقعة على الاستعلام الائتماني."),
};

export const documentHints: Record<string, Pair> = {
  "Face must be unobstructed": pair("Face must be unobstructed", "يجب أن يكون الوجه واضحاً"),
  "Expiry date must be readable": pair("Expiry date must be readable", "يجب أن يكون تاريخ الانتهاء مقروءاً"),
  "Name must match the applicant": pair("Name must match the applicant", "يجب أن يطابق الاسم اسم المتقدم"),
  "Issue date within 90 days": pair("Issue date within 90 days", "تاريخ الإصدار خلال 90 يوماً"),
  "At least one full pay period": pair("At least one full pay period", "فترة راتب كاملة واحدة على الأقل"),
  "All pages included": pair("All pages included", "جميع الصفحات مرفقة"),
  "Account holder name visible": pair("Account holder name visible", "اسم صاحب الحساب ظاهر"),
  "Complete return, not a summary page": pair("Complete return, not a summary page", "إقرار كامل وليس صفحة ملخص"),
  "Must be on company letterhead": pair("Must be on company letterhead", "يجب أن يكون على ترويسة الشركة"),
  "Must include appraiser license": pair("Must include appraiser license", "يجب أن يتضمن ترخيص المقيّم"),
  "Legal description must be complete": pair("Legal description must be complete", "يجب أن يكون الوصف القانوني مكتملاً"),
  "VIN must be readable": pair("VIN must be readable", "يجب أن يكون رقم الهيكل مقروءاً"),
  "Entity name must match application": pair("Entity name must match application", "يجب أن يطابق اسم الكيان الطلب"),
  "Signed by an authorized officer": pair("Signed by an authorized officer", "موقع من مسؤول مخوّل"),
  "Routing and account numbers visible": pair("Routing and account numbers visible", "أرقام التوجيه والحساب ظاهرة"),
  "Wet or compliant e-signature required": pair("Wet or compliant e-signature required", "توقيع حي أو إلكتروني متوافق مطلوب"),
};

export const aiFactors: Record<string, Pair> = {
  affordability_low: pair(
    "Requested amount is within a conservative income band",
    "المبلغ المطلوب ضمن نطاق دخل محافظ",
  ),
  affordability_high: pair(
    "Requested amount is high relative to stated income",
    "المبلغ المطلوب مرتفع نسبة إلى الدخل المصرّح",
  ),
  affordability_mid: pair(
    "Requested amount is within a reviewable income range",
    "المبلغ المطلوب ضمن نطاق دخل قابل للمراجعة",
  ),
  complete_packet: pair(
    "All required documents passed automated validation",
    "جميع المستندات المطلوبة اجتازت التحقق الآلي",
  ),
  complete_packet_short: pair("All required documents passed", "جميع المستندات المطلوبة اجتازت الفحص"),
  employment: pair("Applicant reported unemployed status", "المتقدم صرّح بأنه عاطل عن العمل"),
  residency: pair("Non-permanent residency requires manual policy review", "الإقامة غير الدائمة تتطلب مراجعة يدوية"),
};

export const aiRationales: Record<string, Pair> = {
  approve: pair(
    "Packet completeness, income alignment, and automated document checks support a straight-through approval.",
    "اكتمال الملف وتوافق الدخل والفحوصات الآلية تدعم قبولاً مباشراً.",
  ),
  reject: pair(
    "Material document failures or elevated risk signals exceed the automated approval threshold.",
    "إخفاقات جوهرية في المستندات أو إشارات مخاطر مرتفعة تتجاوز حد القبول الآلي.",
  ),
  review: pair(
    "Signals are mixed. A human reviewer should confirm identity, income, and any open flags before deciding.",
    "الإشارات مختلطة. يجب أن يؤكد مراجع بشري الهوية والدخل وأي إشارات مفتوحة قبل القرار.",
  ),
  seed_approve: pair("Complete packet with aligned income and no open flags.", "ملف مكتمل بدخل متوافق ودون إشارات مفتوحة."),
  seed_reject: pair(
    "Document quality failures and elevated affordability risk.",
    "إخفاقات في جودة المستندات ومخاطر قدرة سداد مرتفعة.",
  ),
};

export const phrases: Record<string, Pair> = {
  "Application created": pair("Application created", "تم إنشاء الطلب"),
  "Application submitted": pair("Application submitted", "تم تقديم الطلب"),
  "Assigned to review queue": pair("Assigned to review queue", "أُحيل إلى طابور المراجعة"),
  "File opened": pair("File opened", "فُتح الملف"),
  "Income and title checks cleared": pair("Income and title checks cleared", "اجتاز فحوصات الدخل والملكية"),
  "Manual review started": pair("Manual review started", "بدأت المراجعة اليدوية"),
  "Vehicle title is unreadable and income docs do not cover the stated period.": pair(
    "Vehicle title is unreadable and income docs do not cover the stated period.",
    "استمارة المركبة غير مقروءة ومستندات الدخل لا تغطي الفترة المصرّح بها.",
  ),
  "Vehicle title is unreadable and the tax return appears incomplete. Please re-upload both documents.": pair(
    "Vehicle title is unreadable and the tax return appears incomplete. Please re-upload both documents.",
    "استمارة المركبة غير مقروءة والإقرار الضريبي يبدو غير مكتمل. يرجى إعادة رفع المستندين.",
  ),
  "Income, reserves, and title package meet policy. Appraisal variance within tolerance.": pair(
    "Income, reserves, and title package meet policy. Appraisal variance within tolerance.",
    "الدخل والاحتياطي وحزمة الملكية تستوفي السياسة. فرق التقييم ضمن الحد المقبول.",
  ),
  "VIN and issuing authority are not readable.": pair(
    "VIN and issuing authority are not readable.",
    "رقم الهيكل وجهة الإصدار غير مقروءين.",
  ),
  "Filing year and AGI could not be extracted.": pair(
    "Filing year and AGI could not be extracted.",
    "تعذر استخراج سنة الإقرار والدخل الإجمالي.",
  ),
  "Vehicle title image failed OCR. VIN cannot be matched to the application.": pair(
    "Vehicle title image failed OCR. VIN cannot be matched to the application.",
    "فشل التعرف على صورة الاستمارة. لا يمكن مطابقة رقم الهيكل مع الطلب.",
  ),
  "Stated income is not supported by the uploaded tax filing.": pair(
    "Stated income is not supported by the uploaded tax filing.",
    "الدخل المصرّح به غير مدعوم بالإقرار الضريبي المرفوع.",
  ),
  "Bank statement validation is still running.": pair(
    "Bank statement validation is still running.",
    "التحقق من كشف الحساب ما زال جارياً.",
  ),
  "Registered address differs from the applicant residential address.": pair(
    "Registered address differs from the applicant residential address.",
    "العنوان المسجّل يختلف عن عنوان سكن المتقدم.",
  ),
  "Maya Chen submitted a personal loan application.": pair(
    "Maya Chen submitted a personal loan application.",
    "مايا تشين قدّمت طلب قرض شخصي.",
  ),
  "Alex Rivera opened Maya Chen’s personal loan file.": pair(
    "Alex Rivera opened Maya Chen’s personal loan file.",
    "أليكس ريفيرا فتح ملف القرض الشخصي لمايا تشين.",
  ),
  "Priya Shah approved Jordan Hale’s mortgage.": pair(
    "Priya Shah approved Jordan Hale’s mortgage.",
    "بريا شاه قبلت رهن جوردان هيل العقاري.",
  ),
  "Alex Rivera requested new documents on Maya Chen’s auto loan.": pair(
    "Alex Rivera requested new documents on Maya Chen’s auto loan.",
    "أليكس ريفيرا طلب مستندات جديدة على قرض سيارة مايا تشين.",
  ),
  "Jordan Hale submitted a business loan application.": pair(
    "Jordan Hale submitted a business loan application.",
    "جوردان هيل قدّم طلب قرض تجاري.",
  ),
  "File appears incomplete or too low-resolution for automated review.": pair(
    "File appears incomplete or too low-resolution for automated review.",
    "الملف يبدو غير مكتمل أو منخفض الدقة للمراجعة الآلية.",
  ),
  "Automated quality checks could not read required fields on this file.": pair(
    "Automated quality checks could not read required fields on this file.",
    "الفحوصات الآلية لم تستطع قراءة الحقول المطلوبة في هذا الملف.",
  ),
  "Extracted metadata does not match the expected document template.": pair(
    "Extracted metadata does not match the expected document template.",
    "البيانات المستخرجة لا تطابق قالب المستند المتوقع.",
  ),
  "Document failed automated validation.": pair("Document failed automated validation.", "فشل المستند في التحقق الآلي."),
  "Application not found.": pair("Application not found.", "الطلب غير موجود."),
  "Document not found.": pair("Document not found.", "المستند غير موجود."),
  "Document type not found.": pair("Document type not found.", "نوع المستند غير موجود."),
  "Unknown application type.": pair("Unknown application type.", "نوع الطلب غير معروف."),
  "An account with this email already exists.": pair(
    "An account with this email already exists.",
    "يوجد حساب بهذا البريد مسبقاً.",
  ),
  "Upload every required document before submitting.": pair(
    "Upload every required document before submitting.",
    "ارفع كل المستندات المطلوبة قبل التقديم.",
  ),
  "Request failed": pair("Request failed", "فشل الطلب"),
  "Unable to load": pair("Unable to load", "تعذر التحميل"),
  "File not found": pair("File not found", "الملف غير موجود"),
  "Not found": pair("Not found", "غير موجود"),
  "Try again": pair("Try again", "حاول مرة أخرى"),
  "Try another file": pair("Try another file", "جرّب ملفاً آخر"),
  "Complete the checklist first": pair("Complete the checklist first", "أكمل القائمة أولاً"),
  "2 documents failed automated validation": pair(
    "2 documents failed automated validation",
    "مستندان فشلا في التحقق الآلي",
  ),
  "Complete packet with aligned income and no open flags.": pair(
    "Complete packet with aligned income and no open flags.",
    "ملف مكتمل بدخل متوافق ودون إشارات مفتوحة.",
  ),
  "Document quality failures and elevated affordability risk.": pair(
    "Document quality failures and elevated affordability risk.",
    "إخفاقات في جودة المستندات ومخاطر قدرة سداد مرتفعة.",
  ),
  "All required documents passed": pair("All required documents passed", "جميع المستندات المطلوبة اجتازت الفحص"),
  "Invalid email or password.": pair("Invalid email or password.", "البريد أو كلمة المرور غير صحيحة."),
  Forbidden: pair("Forbidden", "غير مسموح"),
  "Unexpected error": pair("Unexpected error", "خطأ غير متوقع"),
  "documentTypeId and file are required.": pair(
    "documentTypeId and file are required.",
    "نوع المستند والملف مطلوبان.",
  ),
};

export function lookup(table: Record<string, Pair>, key: string, fallback?: string): Pair {
  return table[key] ?? pair(fallback ?? key, fallback ?? key);
}

export function bilingual(en: string, ar: string) {
  return `${en} · ${ar}`;
}

export function pairText(value: Pair) {
  return bilingual(value.en, value.ar);
}

export function overlay(text: string): Pair {
  if (!text) return pair("", "");
  if (phrases[text]) return phrases[text];
  const sep = " · ";
  const idx = text.indexOf(sep);
  if (idx > 0) {
    const en = text.slice(0, idx);
    const ar = text.slice(idx + sep.length);
    if (/[\u0600-\u06FF]/.test(ar)) return pair(en, ar);
    if (phrases[en]) return phrases[en];
  }
  return pair(text, text);
}
