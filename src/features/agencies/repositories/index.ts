import AgencyRepository from "./agency";
import AgencyArchievementRepository from "./agencyArchievements";
import AgentAgentAgencyMembershipRepository from "./agentMembershipRepository";

export const agencyRepo = new AgencyRepository();


export const membershipsRepo = new AgentAgentAgencyMembershipRepository();
export const agencyArchievmentsRepo = new AgencyArchievementRepository();

