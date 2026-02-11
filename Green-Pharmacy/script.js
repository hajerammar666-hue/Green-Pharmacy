const medSelect = document.getElementById("medSelect");
const medForm = document.getElementById("medForm");
const medList = document.getElementById("medList");

// تحميل الأدوية داخل القائمة
function loadMedications() {
  medicationsDB.forEach(med => {
    const option = document.createElement("option");
    option.value = med.id;
    option.textContent = med.name;
    medSelect.appendChild(option);
  });
}

loadMedications();

// حساب تاريخ الانتهاء
function calculateExpiry(purchaseDate, shelfLifeMonths) {
  const date = new Date(purchaseDate);
  date.setMonth(date.getMonth() + shelfLifeMonths);
  return date.toISOString().split("T")[0];
}

// إضافة دواء
medForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const medId = parseInt(medSelect.value);
  const purchaseDate = document.getElementById("purchaseDate").value;

  const medication = medicationsDB.find(m => m.id === medId);

  const expiryDate = calculateExpiry(purchaseDate, medication.shelfLifeMonths);

  const li = document.createElement("li");

  li.innerHTML = `
    <strong>${medication.name}</strong><br>
    الفئة: ${medication.category}<br>
    الجرعة: ${medication.standardDose}<br>
    تاريخ الانتهاء المتوقع: ${expiryDate}<br>
    التأثير البيئي: ${medication.ecoImpact}<br>
    طريقة التخلص: ${medication.disposal}
  `;

  medList.appendChild(li);

  medForm.reset();
});
