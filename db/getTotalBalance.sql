with payment_sum as (select patient_id, sum(payment_amt) as total_payments from payments group by patient_id)
select patients.patientid, patients.first_name, patients.last_name, patients.balance, case when(patients.balance + payment_sum.total_payments) is null then '0' else patients.balance + payment_sum.total_payments end as new_balance
from patients
full outer join payment_sum
on payment_sum.patient_id = patients.patientid;