import {
    AuditOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    FileDoneOutlined,
    FileOutlined,
    FileSearchOutlined,
    FileSyncOutlined,
    FlagFilled,
    FlagOutlined,
    HomeOutlined,
    NotificationFilled,
    PieChartFilled,
    RocketOutlined,
    SettingOutlined,
    SubnodeOutlined,
    TrophyFilled,
    UnorderedListOutlined,
    UserOutlined,
    UserSwitchOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import getUserFromToken from "../../utils/getUserFromToken";
import useGetPermissions from "../../utils/useGetPermissions";
import { useTranslation } from "react-i18next";

const Sidenav = ({ color, sideNavOpenKeys }) => {
    const user = getUserFromToken();
    
    const { permissions } = useGetPermissions();
    const hasPermission = (item) => {
        return permissions?.includes(item ? item : "");
    };
    const { t } = useTranslation();
    // console.log("haspermission", hasPermission("create-user"));
    const menu = [
        {
            label: (
                <></>
            ),
            key: "logo",
            icon: <img src="/short-logo.png" alt="logo" width={40} height={40} className="my-5"/>,
        },

        {
            label: (
                <NavLink to="/admin/dashboard">
                    <span>{t("sidebar.dashboard")}</span>
                </NavLink>
            ),
            key: "dashboard",
            icon: <HomeOutlined />,
        },

        (hasPermission("create-user") ||
            hasPermission("readAll-user") ||
            hasPermission("readAll-role") ||
            hasPermission("readAll-designation") ||
            hasPermission("readAll-department")) && {
            label: t("sidebar.hr"),
            key: "hr",
            icon: <UserOutlined />,
            children: [
                hasPermission("create-user") && {
                    label: (
                        <NavLink to="/admin/hr/staffs/new">
                            <span>{t("sidebar.new_employee")}</span>
                        </NavLink>
                    ),

                    key: "staffs",
                    icon: <UsergroupAddOutlined />,
                },
                hasPermission("readAll-user") && {
                    label: (
                        <NavLink to="/admin/hr/staffs">
                            <span>{t("sidebar.employee_list")}</span>
                        </NavLink>
                    ),
                    key: "users",
                    icon: <UsergroupAddOutlined />,
                },
                hasPermission("readAll-role") && {
                    label: (
                        <NavLink to="/admin/role">
                            <span>{t("sidebar.roles_permissions")}</span>
                        </NavLink>
                    ),
                    key: "roleAndPermissions",
                    icon: <UserSwitchOutlined />,
                },
                hasPermission("readAll-designation") && {
                    label: (
                        <NavLink to="/admin/designation/">
                            <span>{t("sidebar.designation")}</span>
                        </NavLink>
                    ),
                    key: "designation",
                    icon: <UserSwitchOutlined />,
                },
                hasPermission("readAll-department") && {
                    label: (
                        <NavLink to="/admin/department">
                            <span>{t("sidebar.department")}</span>
                        </NavLink>
                    ),
                    key: "department",
                    icon: <UserSwitchOutlined />,
                },
            ],
        },

        (hasPermission("create-attendance") ||
            hasPermission("readAll-attendance")) && {
            label: t("sidebar.attendance"),
            key: "ATTENDANCE",
            icon: <ClockCircleOutlined />,
            children: [
                hasPermission("create-attendance") && {
                    label: (
                        <NavLink to="/admin/attendance">
                            <span>{t("sidebar.attendance")}</span>
                        </NavLink>
                    ),
                    key: "attendance",
                    icon: <FileDoneOutlined />,
                },
                hasPermission("readSingle-attendance") && {
                    label: (
                        <NavLink to={`/admin/attendance/user/${user}`}>
                            <span>{t("sidebar.my_attendance")}</span>
                        </NavLink>
                    ),
                    key: "myAttendance",
                    icon: <FileDoneOutlined />,
                },
            ],
        },

        (hasPermission("create-payroll") ||
            hasPermission("readAll-payroll")) && {
            label: t("sidebar.payroll"),
            key: "payroll",
            icon: <WalletOutlined />,
            children: [
                hasPermission("create-payroll") && {
                    label: (
                        <NavLink to="/admin/payroll/new">
                            <span>{t("sidebar.calculate_payroll")}</span>
                        </NavLink>
                    ),
                    key: "calculatePayroll",
                    icon: <FileDoneOutlined />,
                },
                hasPermission("readAll-payroll") && {
                    label: (
                        <NavLink to="/admin/payroll/list">
                            <span>{t("sidebar.payslip_list")}</span>
                        </NavLink>
                    ),
                    key: "payslipList",
                    icon: <FileOutlined />,
                },
            ],
        },

        hasPermission("readAll-shift") && {
            label: t("sidebar.shift"),
            key: "shift",
            icon: <ClockCircleOutlined />,
            children: [
                hasPermission("readAll-shift") && {
                    label: (
                        <NavLink to="/admin/shift">
                            <span>{t("sidebar.shift")}</span>
                        </NavLink>
                    ),
                    key: "newShift",
                    icon: <FileDoneOutlined />,
                },
            ],
        },

        hasPermission("readAll-employmentStatus") && {
            label: t("sidebar.employment"),
            key: "EMPLOYMENT",
            icon: <RocketOutlined />,
            children: [
                hasPermission("readAll-employmentStatus") && {
                    label: (
                        <NavLink to="/admin/employment-status">
                            <span>{t("sidebar.status")}</span>
                        </NavLink>
                    ),
                    key: "employmentStatus",
                    icon: <FileDoneOutlined />,
                },
            ],
        },

        (hasPermission("create-leaveApplication") ||
            hasPermission("readAll-leaveApplication") ||
            hasPermission("readSingle-leaveApplication")) && {
            label: t("sidebar.leave"),
            key: "leave",
            icon: <UsergroupDeleteOutlined />,
            children: [
                hasPermission("create-leaveApplication") && {
                    label: (
                        <NavLink to="/admin/leave/new">
                            <span> {t("sidebar.new_leave")} </span>
                        </NavLink>
                    ),
                    key: "newLeave",
                    icon: <SubnodeOutlined />,
                },
                hasPermission("readAll-leaveApplication") && {
                    label: (
                        <NavLink to="/admin/leave">
                            <span> {t("sidebar.leave_status")}</span>
                        </NavLink>
                    ),
                    key: "leaveStatus",
                    icon: <FileDoneOutlined />,
                },
                hasPermission("readSingle-leaveApplication") && {
                    label: (
                        <NavLink to={`/admin/leave/user/${user}`}>
                            <span> {t("sidebar.my_leaves")}</span>
                        </NavLink>
                    ),
                    key: "myLeaves",
                    icon: <FileDoneOutlined />,
                },
            ],
        },

        (hasPermission("readAll-weeklyHoliday") ||
            hasPermission("readAll-publicHoliday")) && {
            label: t("sidebar.holiday"),
            key: "holiday",
            icon: <CalendarOutlined />,
            children: [
                hasPermission("readAll-weeklyHoliday") && {
                    label: (
                        <NavLink to="/admin/holiday/week">
                            <span> {t("sidebar.weekly_holiday")}</span>
                        </NavLink>
                    ),
                    key: "weeklyHoliday",
                    icon: <PieChartFilled />,
                },
                hasPermission("readAll-publicHoliday") && {
                    label: (
                        <NavLink to="/admin/holiday/public">
                            <span> {t("sidebar.public_holiday")}</span>
                        </NavLink>
                    ),
                    key: "publicHoliday",
                    icon: <PieChartFilled />,
                },
            ],
        },

        hasPermission("readAll-leavePolicy") && {
            label:  t("sidebar.leave_policy"),
            key: "LEAVE POLICY",
            icon: <CalendarOutlined />,
            children: [
                hasPermission("readAll-leavePolicy") && {
                    label: (
                        <NavLink to="/admin/leave-policy">
                            <span>{t("sidebar.leave_policy")}</span>
                        </NavLink>
                    ),
                    key: "leavePolicy",
                    icon: <PieChartFilled />,
                },
            ],
        },

        hasPermission("readAll-announcement") && {
            label: t("sidebar.announcement"),
            key: "ANNOUNCEMENT",
            icon: <NotificationFilled />,
            children: [
                hasPermission("readAll-announcement") && {
                    label: (
                        <NavLink to="/admin/announcement">
                            <span>{t("sidebar.announcement")}</span>
                        </NavLink>
                    ),
                    key: "announcement",
                    icon: <FlagFilled />,
                },
            ],
        },

        (hasPermission("readAll-account") ||
            hasPermission("readAll-transaction") ||
            hasPermission("create-transaction")) && {
            label: t("sidebar.accounts"),
            key: "accounts",
            icon: <WalletOutlined />,
            children: [
                hasPermission("readAll-account") && {
                    label: (
                        <NavLink to="/admin/account/">
                            <span>{t("sidebar.account")}</span>
                        </NavLink>
                    ),
                    key: "accountList",
                    icon: <UnorderedListOutlined />,
                },

                (hasPermission("readAll-transaction") ||
                    hasPermission("create-transaction")) && {
                    label: (
                        <NavLink to="/admin/transaction/">
                            <span>{t("sidebar.transaction")}</span>
                        </NavLink>
                    ),
                    key: "transaction",
                    icon: <UnorderedListOutlined />,
                },
            ],
        },

        hasPermission("readAll-account") && {
            label: t("sidebar.finance_report"),
            key: "report",
            icon: <FlagOutlined />,
            children: [
                hasPermission("readAll-account") && {
                    label: (
                        <NavLink to="/admin/account/trial-balance">
                            <span>{t("sidebar.trial_balance")}</span>
                        </NavLink>
                    ),
                    key: "trialBalance",
                    icon: <FileDoneOutlined />,
                },
                hasPermission("readAll-account") && {
                    label: (
                        <NavLink to="/admin/account/balance-sheet">
                            <span>{t("sidebar.balance_sheet")}</span>
                        </NavLink>
                    ),
                    key: "balanceSheet",
                    icon: <FileOutlined />,
                },
                hasPermission("readAll-account") && {
                    label: (
                        <NavLink to="/admin/account/income">
                            <span>{t("sidebar.income_statement")}</span>
                        </NavLink>
                    ),
                    key: "incomeStatement",
                    icon: <FileSyncOutlined />,
                },
            ],
        },

        (hasPermission("crate-award") || hasPermission("readAll-award")) && {
            label: (
                <NavLink to="/admin/award">
                    <span>{t("sidebar.awards")}</span>
                </NavLink>
            ),
            key: "award",
            icon: <TrophyFilled />,
        },

        (hasPermission("create-project") ||
            hasPermission("readAll-project") ||
            hasPermission("create-projectTeam") ||
            hasPermission("create-milestone") ||
            hasPermission("readAll-priority") ||
            hasPermission("create-task-Status")) && {
            label: t("sidebar.project"),
            key: "PROJECT",
            icon: <SettingOutlined />,
            children: [
                hasPermission("create-project") && {
                    label: (
                        <NavLink to="/admin/project/new">
                            <span>{t("sidebar.add_project")}</span>
                        </NavLink>
                    ),
                    key: "project",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-project") && {
                    label: (
                        <NavLink to="/admin/project">
                            <span>{t("sidebar.all_projects")}</span>
                        </NavLink>
                    ),
                    key: "allProject",
                    icon: <SettingOutlined />,
                },
                hasPermission("create-projectTeam") && {
                    label: (
                        <NavLink to="/admin/team">
                            <span>{t("sidebar.team")}</span>
                        </NavLink>
                    ),
                    key: "team",
                    icon: <SettingOutlined />,
                },
                (hasPermission("create-priority") ||
                    hasPermission("readAll-priority")) && {
                    label: (
                        <NavLink to="/admin/task-priority">
                            <span>{t("sidebar.task_priority")}</span>
                        </NavLink>
                    ),
                    key: "taskPriority",
                    icon: <SettingOutlined />,
                },
                hasPermission("create-milestone") && {
                    label: (
                        <NavLink to="/admin/milestone">
                            <span>{t("sidebar.add_milestone")}</span>
                        </NavLink>
                    ),
                    key: "milestone",
                    icon: <SettingOutlined />,
                },

                hasPermission("create-taskStatus") && {
                    label: (
                        <NavLink to="/admin/task-status">
                            <span>{t("sidebar.add_task_status")}</span>
                        </NavLink>
                    ),
                    key: "taskStatus",
                    icon: <SettingOutlined />,
                },
            ],
        },

        // === === === recruitment navigation menu starts === === ===
        (hasPermission("create-jobCategory") ||
            hasPermission("readAll-jobCategory") ||
            hasPermission("create-jobType") ||
            hasPermission("readAll-jobType") ||
            hasPermission("create-jobLocation") ||
            hasPermission("readAll-jobLocation") ||
            hasPermission("create-jobSkills") ||
            hasPermission("readAll-jobSkills") ||
            hasPermission("create-jobWorkExperience") ||
            hasPermission("readAll-jobWorkExperience") ||
            hasPermission("create-job") ||
            hasPermission("readAll-job") ||
            hasPermission("create-jobApplication") ||
            hasPermission("readAll-jobApplication") ||
            hasPermission("create-jobInterview") ||
            hasPermission("readAll-jobInterview")) && {
            label: t("sidebar.recruitment"),
            key: "RECRUITMENT",
            icon: <FileSearchOutlined />,
            children: [
                hasPermission("readAll-jobCategory") && {
                    label: (
                        <NavLink to="/admin/recruitment/jobCategory">
                            <span>{t("sidebar.job_category")}</span>
                        </NavLink>
                    ),
                    key: "jobCategory",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-jobType") && {
                    label: (
                        <NavLink to="/admin/recruitment/jobType">
                            <span>{t("sidebar.job_type")}</span>
                        </NavLink>
                    ),
                    key: "jobType",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-jobLocation") && {
                    label: (
                        <NavLink to="/admin/recruitment/jobLocation">
                            <span>{t("sidebar.job_location")}</span>
                        </NavLink>
                    ),
                    key: "jobLocation",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-jobSkills") && {
                    label: (
                        <NavLink to="/admin/recruitment/jobSkills">
                            <span>{t("sidebar.job_skills")}</span>
                        </NavLink>
                    ),
                    key: "jobSkills",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-jobWorkExperience") && {
                    label: (
                        <NavLink to="/admin/recruitment/jobWorkExperience">
                            <span>{t("sidebar.jop_work_experience")}</span>
                        </NavLink>
                    ),
                    key: "jobWorkExperience",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-job") && {
                    label: (
                        <NavLink to="/admin/recruitment/job">
                            <span>{t("sidebar.job")}</span>
                        </NavLink>
                    ),
                    key: "job",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-jobApplication") && {
                    label: (
                        <NavLink to="/admin/recruitment/jobApplication">
                            <span>{t("sidebar.job_application")}</span>
                        </NavLink>
                    ),
                    key: "jobApplication",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-jobApplication") && {
                    label: (
                        <NavLink to="/admin/jobKanbanBoard">
                            <span>{t("sidebar.job_board")}</span>
                        </NavLink>
                    ),
                    key: "jobKanbanBoard",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-jobInterview") && {
                    label: (
                        <NavLink to="/admin/recruitment/jobInterview">
                            <span>{t("sidebar.job_interview")}</span>
                        </NavLink>
                    ),
                    key: "jobInterview",
                    icon: <SettingOutlined />,
                },
            ],
        },
        // === === === recruitment navigation menu ends === === ===

        // === === === Job Desk navigation menu starts || PUBLIC module === === ===
        {
            label: (
                <NavLink to="/recruitment" target="_blank">
                    <span>{t("sidebar.job_desk")}</span>
                </NavLink>
            ),
            key: "jobDesk",
            icon: <AuditOutlined />,
        },
        // === === === Job Desk navigation menu ends || PUBLIC module === === ===

        hasPermission("readAll-setting") && {
            label: t("sidebar.setting"),
            key: "settings",
            icon: <SettingOutlined />,
            children: [
                hasPermission("readAll-emailConfig") && {
                    label: (
                        <NavLink to="/admin/email-config">
                            <span>{t("sidebar.email_config")}</span>
                        </NavLink>
                    ),
                    key: "emailConfig",
                    icon: <SettingOutlined />,
                },
                hasPermission("readAll-setting") && {
                    label: (
                        <NavLink to="/admin/company-setting">
                            <span>{t("sidebar.company_setting")}</span>
                        </NavLink>
                    ),
                    key: "invoiceSetting",
                    icon: <SettingOutlined />,
                },
            ],
        },
    ];

    return (
        <div>
            <Menu
                theme="dark"
                mode="inline"
                items={menu}
                className="sidenav-menu "
                // openKeys={[sideNavOpenKeys]}
                // style={{ backgroundColor: "transparent" }}
            />
        </div>
    );
};

export default Sidenav;
