import cron from 'node-cron';

// Scheduler Agent for recurring workflows
class SchedulerAgent {
  constructor(workflowEngine) {
    this.workflowEngine = workflowEngine;
    this.scheduledJobs = new Map();
  }

  scheduleWorkflow(workflow, schedule) {
    const jobId = `${workflow.id}-${Date.now()}`;

    // Parse schedule (cron format or simple format)
    const cronSchedule = this.parseToCron(schedule);

    console.log(`⏰ Scheduling workflow: ${workflow.name}`);
    console.log(`   Schedule: ${schedule} (cron: ${cronSchedule})`);

    const job = cron.schedule(cronSchedule, async () => {
      console.log(`🔔 Executing scheduled workflow: ${workflow.name}`);
      await this.workflowEngine.executeWorkflow(workflow);
    });

    this.scheduledJobs.set(jobId, {
      workflow: workflow,
      schedule: schedule,
      cronSchedule: cronSchedule,
      job: job,
      createdAt: new Date().toISOString()
    });

    return {
      jobId: jobId,
      workflow: workflow.name,
      schedule: schedule,
      nextRun: this.getNextRun(cronSchedule)
    };
  }

  parseToCron(schedule) {
    // Convert simple schedule to cron format
    const schedules = {
      'daily': '0 0 * * *',           // Every day at midnight
      'daily-6pm': '0 18 * * *',       // Every day at 6 PM
      'hourly': '0 * * * *',           // Every hour
      'weekly': '0 0 * * 0',           // Every Sunday
      'monthly': '0 0 1 * *',          // First day of month
      'every-5-minutes': '*/5 * * * *', // Every 5 minutes
      'every-minute': '* * * * *'      // Every minute (for testing)
    };

    return schedules[schedule] || schedule;
  }

  getNextRun(cronSchedule) {
    // Simple next run calculation (would use cron parser in production)
    return new Date(Date.now() + 60000).toISOString();
  }

  stopSchedule(jobId) {
    const scheduledJob = this.scheduledJobs.get(jobId);
    
    if (scheduledJob) {
      scheduledJob.job.stop();
      this.scheduledJobs.delete(jobId);
      
      console.log(`⏹️  Stopped scheduled job: ${jobId}`);
      
      return {
        success: true,
        message: `Schedule stopped for ${scheduledJob.workflow.name}`
      };
    }

    return {
      success: false,
      message: 'Job not found'
    };
  }

  getAllSchedules() {
    return Array.from(this.scheduledJobs.entries()).map(([id, job]) => ({
      jobId: id,
      workflowName: job.workflow.name,
      workflowId: job.workflow.id,
      schedule: job.schedule,
      cronSchedule: job.cronSchedule,
      createdAt: job.createdAt,
      nextRun: this.getNextRun(job.cronSchedule)
    }));
  }

  stopAllSchedules() {
    for (const [jobId, scheduledJob] of this.scheduledJobs) {
      scheduledJob.job.stop();
    }
    this.scheduledJobs.clear();
    console.log('⏹️  All schedules stopped');
  }
}

export default SchedulerAgent;
