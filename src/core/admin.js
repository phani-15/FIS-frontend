import { API } from "../backend"
import { isAuthenticated } from "../core/auth"
export const adminlogin = async user => {
  return await fetch(`${API}/admin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .catch(err => console.log("error is ", err));
};


export const AdminDashboard = async (id) => {
  const { token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/admin/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log("error is ", err);
  }
};


export const getRequests = async (userId) => {
  try {
    const { token } = isAuthenticated()
    const response = await fetch(`${API}/request/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const acceptRequest = async (userId, rid) => {
  try {
    const { token } = isAuthenticated()
    const response = await fetch(`${API}/requestac/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ rid })
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export const rejectRequest = async (userId, rid) => {
  try {
    const { token } = isAuthenticated()
    const response = await fetch(`${API}/requestrej/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ rid })
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}


export const addfaculty = async (obj) => {
  const { token } = isAuthenticated();
  const response = await fetch(`${API}/dummyreg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization:`Bearer ${token}`
    },
    body: JSON.stringify(obj)
  })
  return response.json()
}

/**
 * Send bulk registration emails to faculty members from Excel data
 * @param {Array} facultyList - Array of objects with {memberEmail, memberName, Password}
 * @param {Function} onProgress - Callback function called after each email with progress info
 * @returns {Object} Summary with successCount, failedCount, and results array
 */
export const sendBulkRegistrationEmails = async (facultyList, onProgress) => {
  let successCount = 0;
  let failedCount = 0;
  const results = [];
  for (let i = 0; i < facultyList.length; i++) {
    const faculty = facultyList[i];
    try {
      const res = await addfaculty({
        email: faculty.memberEmail,
        password: faculty.Password,
        name: faculty.memberName
      });

      if (res.msg) {
        successCount++;
        results.push({ email: faculty.memberEmail, status: 'success' });
      } else {
        failedCount++;
        results.push({ email: faculty.memberEmail, status: 'failed', error: res.error });
      }
    } catch (error) {
      failedCount++;
      results.push({ email: faculty.memberEmail, status: 'failed', error: error.message });
    }

    // Report progress after each email
    if (onProgress) {
      onProgress({ current: i + 1, total: facultyList.length, successCount, failedCount });
    }
  }

  return { successCount, failedCount, results };
};

// ==================== HOD Registration ====================

export const addHod = async (obj) => {
  const response = await fetch(`${API}/hodregister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  })
  return response.json()
}

/**
 * Send bulk registration emails to HODs from Excel data
 * @param {Array} hodList - Array of objects with {memberEmail, department, Password}
 * @param {Function} onProgress - Callback function called after each registration
 * @returns {Object} Summary with successCount, failedCount, and results array
 */
export const sendBulkHodRegistration = async (hodList, onProgress) => {
  let successCount = 0;
  let failedCount = 0;
  const results = [];

  for (let i = 0; i < hodList.length; i++) {
    const hod = hodList[i];
    try {
      const res = await addHod({
        email: hod.memberEmail,
        department: hod.department,
        password: hod.Password
      });

      if (res.user && res.user.message) {
        successCount++;
        results.push({ email: hod.memberEmail, status: 'success' });
      } else {
        failedCount++;
        results.push({ email: hod.memberEmail, status: 'failed', error: res.error });
      }
    } catch (error) {
      failedCount++;
      results.push({ email: hod.memberEmail, status: 'failed', error: error.message });
    }

    if (onProgress) {
      onProgress({ current: i + 1, total: hodList.length, successCount, failedCount });
    }
  }

  return { successCount, failedCount, results };
};

// ==================== OFC Registration ====================

export const addOfc = async (obj) => {
  const response = await fetch(`${API}/ofcregister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  })
  return response.json()
}

/**
 * Send bulk registration emails to OFCs from Excel data
 * @param {Array} ofcList - Array of objects with {memberEmail, role, PassCode}
 * @param {Function} onProgress - Callback function called after each registration
 * @returns {Object} Summary with successCount, failedCount, and results array
 */
export const sendBulkOfcRegistration = async (ofcList, onProgress) => {
  let successCount = 0;
  let failedCount = 0;
  const results = [];

  for (let i = 0; i < ofcList.length; i++) {
    const ofc = ofcList[i];
    try {
      const res = await addOfc({
        role: ofc.role,
        passcode: ofc.PassCode
      });

      if (res.msg) {
        successCount++;
        results.push({ role: ofc.role, status: 'success' });
      } else {
        failedCount++;
        results.push({ role: ofc.role, status: 'failed', error: res.error });
      }
    } catch (error) {
      failedCount++;
      results.push({ role: ofc.role, status: 'failed', error: error.message });
    }

    if (onProgress) {
      onProgress({ current: i + 1, total: ofcList.length, successCount, failedCount });
    }
  }

  return { successCount, failedCount, results };
};