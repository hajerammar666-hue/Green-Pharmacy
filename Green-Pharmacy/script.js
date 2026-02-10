document.addEventListener("DOMContentLoaded", () => {

  const medSelect = document.getElementById("medSelect");
  const medForm = document.getElementById("medForm");
  const medList = document.getElementById("medList");
  const productionDateInput = document.getElementById("productionDate");

  // تعبئة قائمة الأدوية
  medicationsDB.forEach(med => {
    const option = document.createElement("option");
    option.value = med.id;
    option.textContent = `${med.name} – ${med.category}`;
    medSelect.appendChild(option);
  });

  medForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedId = medSelect.value;
    const productionDateValue = productionDateInput.value;

    if (!selectedId || !productionDateValue) return;

    const med = medicationsDB.find(m => m.id == selectedId);

    const productionDate = new Date(productionDateValue);
    const expiryDate = new Date(productionDate);
    expiryDate.setMonth(expiryDate.getMonth() + med.shelfLifeMonths);

    const li = document.createElement("li");
    li.className = med.ecoImpact;

    li.innerHTML = `
      <strong>${med.name}</strong><br><br>

      🗓 <b>تاريخ الإنتاج:</b> ${productionDate.toLocaleDateString()}<br>
      ⏳ <b>تاريخ الانتهاء المتوقع:</b> ${expiryDate.toLocaleDateString()}<br><br>

      💊 <b>الجرعة الصحية:</b> ${med.dosage}<br>
      ⚠️ <b>تحذيرات:</b> ${med.warnings}<br><br>

      🌱 <b>التأثير البيئي:</b> ${med.ecoImpact}<br>
      ♻️ <b>طريقة التخلص الصحيحة:</b> ${med.disposal}
    `;

    medList.appendChild(li);
    medForm.reset();
  });

});
